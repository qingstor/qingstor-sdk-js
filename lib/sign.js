// +-------------------------------------------------------------------------
// | Copyright (C) 2016 Yunify, Inc.
// +-------------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0 (the "License");
// | you may not use this work except in compliance with the License.
// | You may obtain a copy of the License in the LICENSE file, or at:
// |
// | http://www.apache.org/licenses/LICENSE-2.0
// |
// | Unless required by applicable law or agreed to in writing, software
// | distributed under the License is distributed on an "AS IS" BASIS,
// | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// | See the License for the specific language governing permissions and
// | limitations under the License.
// +-------------------------------------------------------------------------

"use strict";

var logger = require('loglevel');
var url = require('url');
var _ = require('lodash/core');

var Signer = function (op, access_key_id, secret_access_key) {
    this.op = op;
    this.sign = function () {
        op.headers.Authorization = 'QS '
            + access_key_id
            + ':'
            + this.getAuthorization();
        return op;
    };
    this.query_sign = function (expires) {
        delete op.headers['X-QS-Date'];
        delete op.headers['Host'];
        var url_object = url.parse(op.uri);
        if (!_.isNull(url_object.query)) {
            url_object.query += '&' + 'signature=' + this.getQuerySignature(expires)
                + '&' + 'access_key_id=' + access_key_id
                + '&' + 'expires=' + expires;
        } else {
            url_object.query = 'signature=' + this.getQuerySignature(expires)
                + '&' + 'access_key_id=' + access_key_id
                + '&' + 'expires=' + expires;
        }
        url_object.search = '?' + url_object.query;
        op.uri = url.format(url_object);
        logger.debug('QingStor query request url: ' + op.uri);
        return op;
    };
    this.getContentMD5 = function () {
        var parsedContentMD5 = '';
        if (op.headers.hasOwnProperty('Content-MD5')) {
            parsedContentMD5 = op.headers['Content-MD5'];
        }
        return parsedContentMD5;
    };
    this.getContentType = function () {
        var parsedContentType = '';
        if (op.headers.hasOwnProperty('Content-Type')) {
            parsedContentType = op.headers['Content-Type'];
        }
        return parsedContentType;
    };
    this.getCanonicalizedHeaders = function (hasDate) {
        var i = undefined;
        if (_.isUndefined(hasDate))
            hasDate = true;
        var canonicalizedHeaders = '';
        var headers = op.headers;
        var keys = [];
        for (i in headers) {
            if (i.toLowerCase().indexOf('x-qs-') !== -1) {
                if (hasDate || i.toLowerCase().trim() !== 'x-qs-date') {
                    keys.push(
                        i.toLowerCase().trim()
                        + ':'
                        + headers[i].trim()
                    )
                }
            }
        }
        keys = keys.sort();
        if (keys.length > 0) {
            for (i in keys) {
                canonicalizedHeaders += keys[i] + '\n';
            }
        }
        return canonicalizedHeaders;
    };
    this.getCanonicalizedResource = function () {
        var url = require('url').parse(op.uri);
        var path = url.pathname;
        var canonicalizedResource = path;
        var keys = [];
        if (url.query) {
            for (var i in url.query.split('&')) {
                var values = url.query.split('&')[i].split('=');
                if (this.isSubResource(values[0])) {
                    if (values.length > 1) {
                        keys.push(values[0] + '=' + _.escape(values[1]));
                    } else {
                        keys.push(values[0])
                    }
                }
            }
            keys = keys.sort();
        }
        var joinedKeys = keys.join('&');
        if (joinedKeys) {
            canonicalizedResource += '?' + joinedKeys;
        }
        return canonicalizedResource;
    };
    this.getAuthorization = function () {
        var string_to_sign = op.method + '\n'
            + this.getContentMD5() + '\n'
            + this.getContentType() + '\n'
            + '\n'
            + this.getCanonicalizedHeaders()
            + this.getCanonicalizedResource();
        logger.debug('QingStor request string to sign: ' + string_to_sign);
        var h = require('crypto').createHmac('sha256', secret_access_key);
        h.update(string_to_sign);
        var sigb64 = new Buffer(h.digest()).toString('base64');
        logger.debug('QingStor request authorization: ' + sigb64);
        return sigb64;
    };
    this.getQuerySignature = function (expires) {
        var string_to_sign = op.method + '\n'
            + this.getContentMD5() + '\n'
            + this.getContentType() + '\n'
            + expires + '\n'
            + this.getCanonicalizedHeaders(false)
            + this.getCanonicalizedResource();
        logger.debug('QingStor query request string to sign: ' + string_to_sign);
        var h = require('crypto').createHmac('sha256', secret_access_key);
        h.update(string_to_sign);
        var sigb64 = encodeURIComponent(new Buffer(h.digest()).toString('base64'));
        logger.debug('QingStor query request authorization: ' + sigb64);
        return sigb64;
    };

    this.isSubResource = function (key) {
        var keysMap = [
            "acl",
            "cors",
            "delete",
            "mirror",
            "part_number",
            "policy",
            "stats",
            "upload_id",
            "uploads"
        ];
        return _.indexOf(keysMap, key) !== -1;
    }
};

module.exports = Signer;
