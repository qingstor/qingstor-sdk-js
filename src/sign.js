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
  constructor(operation, access_key_id, secret_access_key) {
    this.operation = operation;
    this.access_key_id = access_key_id;
    this.secret_access_key = secret_access_key;
  }

  sign() {
    this.operation.headers.Authorization = `QS ${this.access_key_id}:${this.getAuthorization()}`;
    return this.operation;
  }

  signQuery(expires) {
    delete this.operation.headers['X-QS-Date'];
    delete this.operation.headers['Host'];
    delete this.operation.headers['Content-Length'];
    delete this.operation.headers['Content-Type'];
    delete this.operation.headers['User-Agent'];

    const data = {
      signature: this.getQuerySignature(expires),
      access_key_id: this.access_key_id,
      expires: expires
    };

    let url_object = url.parse(this.operation.uri, true);
    url_object.query = _.extend({}, url_object.query, data);
    url_object.search = '?' + querystring.stringify(url_object.query);
    this.operation.uri = url.format(url_object);
    this.operation.params = _.extend({}, this.operation.params, data);
    logger.debug(`QingStor query request url: ${this.operation.uri}`);
    return this.operation;
  }

  getContentMD5() {
    let parsedContentMD5 = '';
    if (this.operation.headers.hasOwnProperty('Content-MD5')) {
      parsedContentMD5 = this.operation.headers['Content-MD5'];
    }
    return parsedContentMD5;
  }

  getContentType() {
    let parsedContentType = '';
    if (this.operation.headers.hasOwnProperty('Content-Type')) {
      parsedContentType = this.operation.headers['Content-Type'];
    }
    return parsedContentType;
  }

  getCanonicalizedHeaders(hasDate) {
    if (_.isUndefined(hasDate))
      hasDate = true;
    let canonicalizedHeaders = '';
    let headers = {};

    _.forEach(this.operation.headers, function(v, k) {
      if (k.toLowerCase().indexOf('x-qs-') !== -1) {
        if (hasDate || k.toLowerCase().trim() !== 'x-qs-date') {
          headers[k.toLowerCase()] = v;
        }
      }
    });

    let keys = Object.keys(headers).sort();
    if (keys.length > 0) {
      for (let i of keys) {
        canonicalizedHeaders += `${i.toLowerCase().trim()}:${headers[i].trim()}
`;
      }
    }
    return canonicalizedHeaders;
  }

  getCanonicalizedResource() {
    let parsedURI = url.parse(this.operation.uri, true);
    let canonicalizedResource = parsedURI.pathname;
    let query = [];
    if (!_.isEmpty(parsedURI.query)) {
      for (let i in parsedURI.query) {
        if (this.isSubResource(i)) {
          if (parsedURI.query[i] !== '') {
            query.push(`${i}=${parsedURI.query[i]}`);
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
    return this.calculateSignature(this.getStringToSign());
  }

  getQuerySignature(expires) {
    return this.calculateSignature(this.getQueryStringToSign(expires));
  }

  getStringToSign() {
    let stringToSign = this.operation.method + '\n' +
    this.getContentMD5() + '\n' +
    this.getContentType() + '\n' + '\n' +
    this.getCanonicalizedHeaders() +
    this.getCanonicalizedResource();

    logger.debug(`QingStor request string to sign: ${stringToSign}`);
    return stringToSign;
  }

  getQueryStringToSign(expires) {
    let stringToSign = this.operation.method + '\n' +
    this.getContentMD5() + '\n' +
    this.getContentType() + '\n' +
    expires + '\n' +
    this.getCanonicalizedHeaders(false) +
    this.getCanonicalizedResource();

    logger.debug(`QingStor query request string to sign: ${stringToSign}`);
    return stringToSign;
  }

  calculateSignature(stringToSign) {
    let h = createHmac('sha256', this.secret_access_key);
    h.update(stringToSign);

    let signature = new Buffer(h.digest()).toString('base64');
    logger.debug('QingStor query request authorization: ' + signature);
    return signature;
  }

  isSubResource(key) {
    return [
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
    ].includes(key);
  }
}

export default Signer;
