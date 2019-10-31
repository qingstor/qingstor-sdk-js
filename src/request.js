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

import axios from 'axios';

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
    if (this.config.signature_server) {
      return axios({
        url: this.config.signature_server,
        method: 'POST',
        body: this.operation,
      }).then((res) => {
        const { authorization } = res.data;

        this.operation.headers.authorization = authorization;

        return this;
      });
    }

    this.operation = new Signer(this.config.access_key_id, this.config.secret_access_key).sign(this.operation);
    return Promise.resolve(this);
  }

  signQuery(expires) {
    if (this.config.signature_server) {
      return new Promise();
    }

    this.operation = new Signer(this.config.access_key_id, this.config.secret_access_key).signQuery({
      ...this.operation,
      expires,
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
      return axios({
        url: this.operation.uri,
        method: this.operation.method,
        headers: this.operation.headers,
        data: this.operation.body,
      });
    });
  }
}

export default Request;
