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

import Signer from './sign';
import Builder from './build';
import axios from './http_client';
import { buildUri, isFunction } from './utils';

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
    if (this.config.signature_server) {
      return axios({
        url: this.config.signature_server,
        method: 'POST',
        data: this.operation,
      }).then((res) => {
        const { authorization } = res.data;

        this.operation.headers.authorization = authorization;

        return this;
      });
    }

    this.operation = new Signer(this.config.access_key_id, this.config.secret_access_key).sign(this.operation);
    return Promise.resolve(this);
  }

  signQuery(expiresTTL) {
    if (this.config.signature_server) {
      return axios({
        url: this.config.signature_server,
        method: 'POST',
        data: { ...this.operation, expiresTTL: expiresTTL },
      }).then((res) => {
        const { access_key_id, signature, expires } = res.data;

        this.operation.uri = buildUri(this.operation.endpoint, this.operation.path, {
          ...this.operation.params,
          access_key_id,
          signature,
          expires,
        });

        return this;
      });
    }

    this.operation = new Signer(this.config.access_key_id, this.config.secret_access_key).signQuery({
      ...this.operation,
      expires: parseInt(now / 1000 + operation.expiresTTL),
    });
    return Promise.resolve(this);
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

  send() {
    return this.sign().then(() => {
      const axiosConfig = isFunction(this.config.getAxiosConfig) ? this.config.getAxiosConfig(this.operation) : {};

      return axios({
        ...axiosConfig,
        url: this.operation.uri,
        method: this.operation.method,
        headers: this.operation.headers,
        data: this.operation.body || '',
      });
    });
  }
}

export default Request;
