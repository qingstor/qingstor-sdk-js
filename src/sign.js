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

import logger from 'loglevel';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { buildUri } from './utils';

class Signer {
  constructor(access_key_id, secret_access_key) {
    this.access_key_id = access_key_id;
    this.secret_access_key = secret_access_key;
  }

  getSignature(operation) {
    this._setOperation(operation);

    const originalHeaders = this.operation.headers;

    const parsedHeaders = Object.keys(originalHeaders)
      .filter((key) => {
        const _key = key.toLowerCase();

        return _key === 'x-qs-date' || _key === 'date';
      })
      .reduce((headers, key) => {
        headers[key.toLowerCase()] = originalHeaders[key];
        return headers;
      }, {});

    const signedDate = parsedHeaders['x-qs-date'] || parsedHeaders['date'] || new Date().toUTCString();

    return {
      authorization: `QS ${this.access_key_id}:${this.getAuthorization()}`,
      signed_date: signedDate,
    };
  }

  getQuerySignature(operation) {
    this._setOperation(operation);

    const now = Date.now();
    // todo throw error if expiresTTL is invaild
    const expiresTTL = parseInt(operation.expiresTTL);
    const expires = parseInt(now / 1000 + expiresTTL);

    return {
      expires,
      signature: this.calculateSignature(this.getQueryStringToSign(expires)),
      access_key_id: this.access_key_id,
      signed_date: new Date(now).toUTCString(),
    };
  }

  sign(operation) {
    this._setOperation(operation);

    this.operation.headers.authorization = `QS ${this.access_key_id}:${this.getAuthorization()}`;
    return this.operation;
  }

  signQuery(operation) {
    this._setOperation(operation);
    delete this.operation.headers['x-qs-date'];
    delete this.operation.headers['host'];
    delete this.operation.headers['content-length'];
    delete this.operation.headers['content-type'];
    delete this.operation.headers['user-agent'];

    const data = {
      signature: this.calculateSignature(this.getQueryStringToSign(operation.expires)),
      access_key_id: this.access_key_id,
      expires: operation.expires,
    };

    this.operation.params = Object.assign(this.operation.params, data);
    this.operation.uri = buildUri(this.operation.endpoint, this.operation.path, this.operation.params);

    logger.debug(`QingStor query request url: ${this.operation.uri}`);
    return this.operation;
  }

  getContentMD5() {
    let parsedContentMD5 = '';
    if (this.operation.headers['content-md5']) {
      parsedContentMD5 = this.operation.headers['content-md5'];
    }
    return parsedContentMD5;
  }

  getContentType() {
    let parsedContentType = '';
    if (this.operation.headers['content-type']) {
      parsedContentType = this.operation.headers['content-type'];
    }
    return parsedContentType;
  }

  getCanonicalizedHeaders() {
    return Object.keys(this.operation.headers)
      .filter((key) => {
        return key.toLowerCase().startsWith('x-qs-');
      })
      .sort()
      .map((key) => {
        return `${key.toLowerCase().trim()}:${this.operation.headers[key].trim()}`;
      })
      .join('\n');
  }

  getCanonicalizedResource() {
    let canonicalizedResource = this.operation.path;
    const parsedParams = this.operation.params || {};
    const query = [];
    if (Object.keys(parsedParams).length !== 0) {
      for (const i of Object.keys(parsedParams)) {
        if (this.isSubResource(i)) {
          if (parsedParams[i] !== '') {
            query.push(`${i}=${parsedParams[i]}`);
          } else {
            query.push(i);
          }
        }
      }
    }
    const joinedKeys = query.sort().join('&');
    if (joinedKeys) {
      const separator = canonicalizedResource.includes('?') ? '&' : '?';
      canonicalizedResource += separator + joinedKeys;
    }
    return canonicalizedResource;
  }

  getAuthorization() {
    return this.calculateSignature(this.getStringToSign());
  }

  getStringToSign() {
    const stringToSign = [
      this.operation.method,
      this.getContentMD5(),
      this.getContentType(),
      this.operation.headers.date || '',
      this.getCanonicalizedHeaders(),
      this.getCanonicalizedResource(),
    ].join('\n');

    logger.debug(`QingStor request string to sign: ${stringToSign}`);
    return stringToSign;
  }

  getQueryStringToSign(expires) {
    const stringToSign = [
      this.operation.method,
      this.getContentMD5(),
      this.getContentType(),
      expires,
      this.getCanonicalizedHeaders(),
      this.getCanonicalizedResource(),
    ].join('\n');

    logger.debug(`QingStor query request string to sign: ${stringToSign}`);
    return stringToSign;
  }

  calculateSignature(stringToSign) {
    const signature = Base64.stringify(hmacSHA256(stringToSign, this.secret_access_key));

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
      'lifecycle',
      'notification',
      'response-expires',
      'response-cache-control',
      'response-content-type',
      'response-content-language',
      'response-content-encoding',
      'response-content-disposition',
    ].includes(key);
  }

  _setOperation(operation) {
    this.operation = {
      headers: {},
      ...operation,
    };
  }
}

export default Signer;
