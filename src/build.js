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
import mime from 'mime-types';
import util from 'util';
import _ from 'lodash/core';
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
    for (let i in operation.params) {
      if (operation.params.hasOwnProperty(i) && operation.params[i].toString() !== '') {
        parsedParams[i] = operation.params[i].toString();
      }
    }
    return parsedParams;
  }

  parseRequestHeaders(operation) {
    let parsedHeaders = {};
    for (let i in operation.headers) {
      if (operation.headers.hasOwnProperty(i) && operation.headers[i] !== '') {
        parsedHeaders[i] = encodeURI(operation.headers[i]);
      }
    }
    //Add X-QS-Date header
    parsedHeaders['X-QS-Date'] = _.result(
      operation.headers,
      'X-QS-Date',
      new Date().toUTCString()
    );

    // Add Content-Type header
    parsedHeaders['Content-Type'] = _.result(
      operation.headers,
      'Content-Type',
      mime.lookup(this.parseRequestProperties(operation)['object-key']) || 'application/octet-stream'
    );

    // Add Content-Length header
    let noContentLength = _.isEmpty(operation.headers['Content-Length']);
    let parsedBody = this.parseRequestBody(operation);
    if (noContentLength && parsedBody) {
      if (parsedBody.constructor === fs.ReadStream) {
        let stats = fs.statSync(parsedBody.path);
        parsedHeaders['Content-Length'] = stats.size;
      } else if (parsedBody.constructor === Buffer) {
        parsedHeaders['Content-Length'] = this.parseRequestBody(operation).byteLength;
      } else {
        parsedHeaders['Content-Length'] = this.parseRequestBody(operation).length;
      }
    } else {
      parsedHeaders['Content-Length'] = _.result(operation.headers, 'Content-Length', 0);
    }

    // Add User-Agent header
    parsedHeaders['User-Agent'] = util.format(
      'qingstor-sdk-js/%s (Node.js %s; %s %s)',
      global.version, process.version, process.platform, process.arch,
    );
    if (!_.isEmpty(this.config.additional_user_agent)) {
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
    let parsedBody = null;
    if (!_.isEmpty(operation.body)) {
      parsedBody = operation.body;
    } else if (!_.isEmpty(operation.elements)) {
      parsedBody = new Buffer(JSON.stringify(operation.elements));
    }
    return parsedBody;
  }

  parseRequestProperties(operation) {
    let parsedProperties = {};
    for (let i in operation.properties) {
      if (operation.properties.hasOwnProperty(i) && operation.properties[i] !== '') {
        parsedProperties[i] = fixedEncodeURIComponent(operation.properties[i]);
      }
    }
    return parsedProperties;
  }

  parseRequestURI(operation) {
    let path = operation.uri;
    let endpoint = "";
    let parsedProperties = this.parseRequestProperties(operation);

    if (_.result(parsedProperties, 'zone')) {
      endpoint = `${this.config.protocol}://${parsedProperties.zone}.${this.config.host}:${this.config.port}`
    } else {
      endpoint = `${this.config.protocol}://${this.config.host}:${this.config.port}`;
    }

    for (let key in parsedProperties) {
      if (parsedProperties.hasOwnProperty(key)) {
        path = path.replace(`<${key}>`, parsedProperties[key]);
      }
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
