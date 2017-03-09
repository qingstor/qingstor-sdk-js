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

import url from 'url';
import _ from 'lodash/core';
import logger from 'loglevel';
import { createHmac } from 'crypto';
import querystring from 'querystring';


class Signer {
  constructor(op, access_key_id, secret_access_key) {
    this.op = op;
    this.access_key_id = access_key_id;
    this.secret_access_key = secret_access_key;
  }

  sign() {
    this.op.headers.Authorization = 'QS '
    + this.access_key_id
    + ':'
    + this.getAuthorization();
    return this.op;
  }

  query_sign(expires) {
    delete this.op.headers['X-QS-Date'];
    delete this.op.headers['Host'];
    delete this.op.headers['Content-Type'];
    delete this.op.headers['User-Agent'];

    let url_object = url.parse(this.op.uri, true);
    url_object.query = Object.assign(url_object.query, {
      signature: this.getQuerySignature(expires),
      access_key_id: this.access_key_id,
      expires: expires
    });
    url_object.search = '?' + querystring.stringify(url_object.query);
    this.op.uri = url.format(url_object);
    logger.debug('QingStor query request url: ' + this.op.uri);
    return this.op;
  }

  getContentMD5() {
    let parsedContentMD5 = '';
    if (this.op.headers.hasOwnProperty('Content-MD5')) {
      parsedContentMD5 = this.op.headers['Content-MD5'];
    }
    return parsedContentMD5;
  }

  getContentType() {
    let parsedContentType = '';
    if (this.op.headers.hasOwnProperty('Content-Type')) {
      parsedContentType = this.op.headers['Content-Type'];
    }
    return parsedContentType;
  }

  getCanonicalizedHeaders(hasDate) {
    if (_.isUndefined(hasDate))
      hasDate = true;
    let canonicalizedHeaders = '';
    let headers = {};

    _.forEach(this.op.headers, function(v, k) {
      if (k.toLowerCase().indexOf('x-qs-') !== -1) {
        if (hasDate || k.toLowerCase().trim() !== 'x-qs-date') {
          headers[k.toLowerCase()] = v;
        }
      }
    });

    let keys = Object.keys(headers).sort();
    if (keys.length > 0) {
      for (let i of keys) {
        canonicalizedHeaders += i.toLowerCase().trim() + ':' + headers[i].trim() + '\n';
      }
    }
    return canonicalizedHeaders;
  }

  getCanonicalizedResource() {
    let parsedUri = url.parse(this.op.uri, true);
    let canonicalizedResource = parsedUri.pathname;
    let query = [];
    if (!_.isEmpty(parsedUri.query)) {
      for (let i in parsedUri.query) {
        if (this.isSubResource(i)) {
          if (parsedUri.query[i] !== '') {
            query.push(i + '=' + parsedUri.query[i]);
          } else {
            query.push(i)
          }
        }
      }
    }
    let joinedKeys = query.sort().join('&');
    if (joinedKeys) {
      canonicalizedResource += '?' + joinedKeys;
    }
    return canonicalizedResource;
  }

  getAuthorization() {
    let string_to_sign = this.op.method + '\n'
    + this.getContentMD5() + '\n'
    + this.getContentType() + '\n'
    + '\n'
    + this.getCanonicalizedHeaders()
    + this.getCanonicalizedResource();
    logger.debug('QingStor request string to sign: ' + string_to_sign);
    let h = createHmac('sha256', this.secret_access_key);
    h.update(string_to_sign);
    let sigb64 = new Buffer(h.digest()).toString('base64');
    logger.debug('QingStor request authorization: ' + sigb64);
    return sigb64;
  }

  getQuerySignature(expires) {
    let string_to_sign = this.op.method + '\n'
    + this.getContentMD5() + '\n'
    + this.getContentType() + '\n'
    + expires + '\n'
    + this.getCanonicalizedHeaders(false)
    + this.getCanonicalizedResource();
    logger.debug('QingStor query request string to sign: ' + string_to_sign);
    let h = createHmac('sha256', this.secret_access_key);
    h.update(string_to_sign);
    let sigb64 = new Buffer(h.digest()).toString('base64');
    logger.debug('QingStor query request authorization: ' + sigb64);
    return sigb64;
  }

  isSubResource(key) {
    let keysMap = [
      'acl',
      'cors',
      'delete',
      'mirror',
      'part_number',
      'policy',
      'stats',
      'upload_id',
      'uploads',
      'response-expires',
      'response-cache-control',
      'response-content-type',
      'response-content-language',
      'response-content-encoding',
      'response-content-disposition'
    ];
    return keysMap.includes(key);
  }
}

export default Signer;
