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
import { createHmac } from 'crypto';
import { buildUri } from './utils';

class Signer {
  constructor(operation, access_key_id, secret_access_key) {
    this.operation = operation;
    this.access_key_id = access_key_id;
    this.secret_access_key = secret_access_key;
  }

  sign() {
    this.operation.headers.authorization = `QS ${this.access_key_id}:${this.getAuthorization()}`;
    return this.operation;
  }

  signQuery(expires) {
    delete this.operation.headers['x-qs-date'];
    delete this.operation.headers['host'];
    delete this.operation.headers['content-length'];
    delete this.operation.headers['content-type'];
    delete this.operation.headers['user-agent'];

    const data = {
      signature: this.getQuerySignature(expires),
      access_key_id: this.access_key_id,
      expires: expires
    };

    this.operation.params = Object.assign(this.operation.params, data);
    this.operation.uri = buildUri(
      this.operation.endpoint,
      this.operation.path,
      this.operation.params
    );

    logger.debug(`QingStor query request url: ${this.operation.uri}`);
    return this.operation;
  }

  getContentMD5() {
    let parsedContentMD5 = '';
    if (this.operation.headers.hasOwnProperty('content-md5')) {
      parsedContentMD5 = this.operation.headers['content-md5'];
    }
    return parsedContentMD5;
  }

  getContentType() {
    let parsedContentType = '';
    if (this.operation.headers.hasOwnProperty('content-type')) {
      parsedContentType = this.operation.headers['content-type'];
    }
    return parsedContentType;
  }

  getCanonicalizedHeaders(hasDate) {
    if (!hasDate)
      hasDate = true;
    let canonicalizedHeaders = '';
    let headers = {};

    for (let i of Object.keys(this.operation.headers)) {
      if (i.toLowerCase().indexOf('x-qs-') !== -1) {
        if (hasDate || i.toLowerCase().trim() !== 'x-qs-date') {
          headers[i.toLowerCase()] = this.operation.headers[i];
        }
      }
    }

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
    let canonicalizedResource = this.operation.path;
    let parsedParams = this.operation.params;
    let query = [];
    if (Object.keys(parsedParams).length !== 0) {
      for (let i of Object.keys(parsedParams)) {
        if (this.isSubResource(i)) {
          if (parsedParams[i] !== '') {
            query.push(`${i}=${parsedParams[i]}`);
          } else {
            query.push(i)
          }
        }
      }
    }
    let joinedKeys = query.sort().join('&');
    if (joinedKeys) {
      let separator = canonicalizedResource.includes('?') ? '&' : '?';
      canonicalizedResource += separator + joinedKeys;
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

    logger.debug(`QingStor request string to sign:
${stringToSign}`);
    return stringToSign;
  }

  getQueryStringToSign(expires) {
    let stringToSign = this.operation.method + '\n' +
    this.getContentMD5() + '\n' +
    this.getContentType() + '\n' +
    expires + '\n' +
    this.getCanonicalizedHeaders(false) +
    this.getCanonicalizedResource();

    logger.debug(`QingStor query request string to sign:
${stringToSign}`);
    return stringToSign;
  }

  calculateSignature(stringToSign) {
    let h = createHmac('sha256', this.secret_access_key);
    h.update(stringToSign);

    let signature = Buffer.from(h.digest()).toString('base64');
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
      'response-content-disposition'
    ].includes(key);
  }
}

export default Signer;
