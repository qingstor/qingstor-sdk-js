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

import './version';
import fs from 'fs';
import util from 'util';
import logger from 'loglevel';
import { createHash } from 'crypto';
import { fixedEncodeURIComponent, buildUri } from './utils';

class Builder {
  constructor(config, operation) {
    this.config = config;
    this.operation = operation;
  }

  parse() {
    let parsedOperation = this.parseRequestURI(this.operation);
    parsedOperation.method = this.operation.method;
    parsedOperation.params = this.parseRequestParams(this.operation);
    parsedOperation.headers = this.parseRequestHeaders(this.operation);
    parsedOperation.body = this.parseRequestBody(this.operation);

    logger.debug(`QingStor request uri: ${parsedOperation.uri}`);

    return parsedOperation;
  }

  parseRequestParams(operation) {
    let parsedParams = {};
    for (let i of Object.keys(operation.params)) {
      if (operation.params[i] !== undefined && operation.params[i].toString() !== '') {
        parsedParams[i] = operation.params[i].toString();
      }
    }
    return parsedParams;
  }

  parseRequestHeaders(operation) {
    let parsedHeaders = {};
    for (let i of Object.keys(operation.headers)) {
      if (operation.headers[i] !== undefined && operation.headers[i].toString() !== '') {
        parsedHeaders[i] = encodeURI(operation.headers[i]);
      }
    }
    //Add X-QS-Date header
    parsedHeaders['X-QS-Date'] = operation.headers['X-QS-Date'] || new Date().toUTCString();

    // Add Content-Type header
    parsedHeaders['Content-Type'] = operation.headers['Content-Type'] || 'application/octet-stream';


    // Add Content-Length header
    let parsedBody = this.parseRequestBody(operation);
    if (!operation.headers['Content-Length'] && parsedBody) {
      if (parsedBody.constructor === fs.ReadStream) {
        let stats = fs.statSync(parsedBody.path);
        parsedHeaders['Content-Length'] = stats.size;
      } else if (parsedBody.constructor === Buffer) {
        parsedHeaders['Content-Length'] = this.parseRequestBody(operation).byteLength;
      } else {
        parsedHeaders['Content-Length'] = this.parseRequestBody(operation).length;
      }
    } else {
      parsedHeaders['Content-Length'] = operation.headers['Content-Length'] || 0;
    }

    // Add User-Agent header
    parsedHeaders['User-Agent'] = util.format(
      'qingstor-sdk-js/%s (Node.js %s; %s %s)',
      global.version, process.version, process.platform, process.arch,
    );
    if (this.config.hasOwnProperty('additional_user_agent') && this.config.additional_user_agent) {
      parsedHeaders['User-Agent'] += util.format(' %s', this.config.additional_user_agent)
    }

    // Add helper for DeleteMultipleObjects
    if (operation.api === 'DeleteMultipleObjects') {
      let h = createHash('md5');
      h.update(this.parseRequestBody(operation));
      parsedHeaders['Content-MD5'] = new Buffer(h.digest()).toString('base64')
    }
    return parsedHeaders;
  }

  parseRequestBody(operation) {
    let parsedBody = undefined;
    if (operation.body !== undefined) {
      parsedBody = operation.body;
    } else if (Object.keys(operation.elements).length !== 0) {
      parsedBody = new Buffer(JSON.stringify(operation.elements));
    }
    return parsedBody;
  }

  parseRequestProperties(operation) {
    let parsedProperties = {};
    for (let i of Object.keys(operation.properties)) {
      if (operation.properties[i] !== undefined && operation.properties[i].toString() !== '') {
        parsedProperties[i] = fixedEncodeURIComponent(operation.properties[i]);
      }
    }
    return parsedProperties;
  }

  parseRequestURI(operation) {
    let path = operation.uri;
    let endpoint = "";
    let parsedProperties = this.parseRequestProperties(operation);

    if (parsedProperties['zone']) {
      endpoint = `${this.config.protocol}://${parsedProperties.zone}.${this.config.host}:${this.config.port}`
    } else {
      endpoint = `${this.config.protocol}://${this.config.host}:${this.config.port}`;
    }

    for (let key of Object.keys(parsedProperties)) {
      path = path.replace(`<${key}>`, parsedProperties[key]);
    }

    let parsedParams = this.parseRequestParams(operation);
    let parsedUri = buildUri(endpoint, path, parsedParams);

    return {
      endpoint,
      path,
      uri: parsedUri
    };
  }
}


export default Builder;
