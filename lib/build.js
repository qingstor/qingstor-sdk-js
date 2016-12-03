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

var _ = require('lodash/core');
var logger = require('loglevel');

var Builder = function(config, operation) {
    this.parse = function() {
        this.parsedOperation = {};
        this.parseRequestHeaders();
        this.parseRequestBody();
        this.parseRequestProperties();
        this.parseRequestParams();
        this.parseRequestUri();
        this.parsedOperation.method = operation.method;
        this.parsedOperation.uri = this.parsedUri;
        if (!_.isEmpty(this.parsedBody)) {
            this.parsedOperation.body = this.parsedBody;
        }
        if (!_.isEmpty(this.parsedHeaders)) {
            this.parsedOperation.headers = this.parsedHeaders;
        }
        return this.parsedOperation;
    };
    this.parseRequestHeaders = function() {
        this.parsedHeaders = {};
        for (var i in operation.headers) {
            if (!_.isEmpty(operation.headers[i])) {
                this.parsedHeaders[i] = operation.headers[i];
            }
        }
        this.parsedHeaders['X-QS-Date'] = _.result(this.parsedHeaders, 'X-QS-Date', new Date().toUTCString());
    };
    this.parseRequestBody = function() {
        var h = require('crypto').createHash('md5');
        if (!_.isEmpty(operation.body)) {
            this.parsedBody = operation.body;
            this.parsedHeaders['Content-Length'] = this.parsedBody.length;
            this.parsedHeaders['Content-MD5'] = h.update(this.parsedBody).digest('hex');
        } else if (!_.isEmpty(operation.elements)) {
            this.parsedBody = JSON.stringify(operation.elements);
            this.parsedHeaders['Content-Length'] = this.parsedBody.length;
            this.parsedHeaders['Content-MD5'] = !_.isEmpty(operation.headers['Content-MD5']) ? operation.headers['Content-MD5'] : h.update(this.parsedBody).digest('hex');
        } else {
            this.parsedBody = undefined;
        }
    };
    this.parseRequestParams = function() {
        this.parsedParams = {};
        for (var i in operation.params) {
            if (!_.isEmpty(operation.params[i]))
                this.parsedParams[i] = operation.params[i];
        }
    };
    this.parseRequestProperties = function() {
        this.parsedProperties = operation.properties;
    };
    this.parseRequestUri = function() {
        var key;
        var properties = this.parsedProperties;
        var zone = '';
        if (properties && properties.hasOwnProperty('zone')) {
            zone = properties.zone;
        }
        var port = String(config.port);
        var protocol = config.protocol;
        var host = config.host;
        var endpoint = protocol + '://' + host + ':' + port;
        if (zone) {
            endpoint = protocol + '://' + zone + '.' + host + ':' + port;
        }
        var requestUri = operation.uri;
        if (!_.isEmpty(properties)) {
            for (key in properties) {
                endpoint = endpoint.replace('<' + key + '>', properties[key]);
                requestUri = requestUri.replace('<' + key + '>', properties[key]);
            }
        }
        this.parsedUri = endpoint + requestUri;
        var params = this.parsedParams;
        if (!_.isEmpty(params)) {
            var paramsParts = [];
            for (key in params) {
                if (!_.isEmpty(params[key])) {
                    paramsParts.push(key + '=' + params[key]);
                }
            }
            if (paramsParts.length) {
                this.parsedUri += '?' + paramsParts.join('&');
            }
        }
        logger.debug(this.parsedUri);
        return this.parsedUri;
    };
};

module.exports = Builder;
