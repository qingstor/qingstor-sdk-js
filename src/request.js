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

import _ from 'lodash/core';
import logger from 'loglevel';
import request from 'request';

import Signer from './sign';
import Builder from './build';

class Request {
  constructor(config, operation) {
    this.config = config;
    this.operation = operation;
  }

  build() {
    this.operation = new Builder(this.config, this.operation).parse();
    return this;
  }

  sign() {
    this.operation = new Signer(
      this.operation, this.config.access_key_id, this.config.secret_access_key,
    ).sign();
    return this;
  }

  signQuery(expires) {
    this.operation = new Signer(
      this.operation, this.config.access_key_id, this.config.secret_access_key,
    ).signQuery(expires);
    return this;
  }

  getStringToSign() {
    return new Signer(
      this.operation, this.config.access_key_id, this.config.secret_access_key,
    ).getStringToSign();
  }

  getQueryStringToSign(expires) {
    return new Signer(
      this.operation, this.config.access_key_id, this.config.secret_access_key,
    ).getQueryStringToSign(expires);
  }

  applySignature(signature) {
    this.operation.headers.Authorization = signature;
    return this;
  }

  applyQuerySignature(access_key_id, signature, expires) {
    this.operation.params.access_key_id = access_key_id;
    this.operation.params.signature = signature;
    this.operation.params.expires = expires;
    return this;
  }

  send(callback) {
    let retries = this.config.connection_retries;
    while (true) {
      try {
        logger.info(`Sending QingStor request: ${this.operation.uri}`);
        request(this.operation, (err, res) => {
          this.response = res;
          callback && callback(err, this.unpack().response);
        });
      } catch (err) {
        logger.error(err);
        if (retries > 0) {
          retries -= 1;
          continue;
        } else {
          throw new Error("Network Error");
        }
      }
      break;
    }
  }

  unpack() {
    if (_.isEmpty(this.response)) {
      return this
    }

    // Unpack Response Headers
    for (let i in this.response.headers) {
      if (this.response.headers.hasOwnProperty(i)) {
        this.response[i] = this.response.headers[i];
      }
    }
    // Unpack Response Body
    let body = this.response.body;
    if (this.response.headers['content-type'] === 'application/json') {
      if (body !== '') {
        let parsed = JSON.parse(body);
        for (let i in parsed) {
          if (parsed.hasOwnProperty(i)) {
            this.response[i] = parsed[i];
          }
        }
      }
    }
    return this;
  }
}

export default Request;
