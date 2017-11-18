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

import Signer from './sign';
import Builder from './build';
import { isFunction } from './utils';

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
    this.operation.params = Object.assign(this.operation.params, {
      access_key_id,
      signature,
      expires,
    });
    return this;
  }

  async send(callback) {
    try {
      let res = await fetch(this.operation.uri, {
        method: this.operation.method,
        headers: this.operation.headers,
        body: this.operation.body
      });
      if (isFunction(callback)) {
        callback(null, await this.unpack(res));
      } else {
        return await this.unpack(res)
      }
    } catch (e) {
      logger.error("SDK request failed for: ", e);
    }
  }

  async unpack(res) {
    let unpack_res = res;
    unpack_res.statusCode = res.status;

    // Unpack Response Headers
    for (let key in res.headers._headers) {
      if (res.headers._headers.hasOwnProperty(key)) {
        unpack_res[key] = res.headers.get(key);
      }
    }

    // Unpack Response Body
    if (res.headers.get('content-type') === 'application/json') {
      let data = await unpack_res.json();
      for (let i in data) {
        if (data.hasOwnProperty(i) && i !== "url") {
          unpack_res[i] = data[i];
        }
      }
    }

    return unpack_res;
  }
}

export default Request;
