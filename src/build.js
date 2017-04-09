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
import url from 'url';
import mime from 'mime-types';
import util from 'util';
import _ from 'lodash/core';
import logger from 'loglevel';
import { createHash } from 'crypto';
import querystring from 'querystring';

class Builder {
  constructor(config, operation) {
    this.config = config;
    this.operation = operation;
  }

  parse() {
    let operation = this.operation;
    let parsedOperation = {};
    parsedOperation.method = operation.method;
    parsedOperation.uri = url.format(this.parseRequestURI(operation));
    parsedOperation.body = this.parseRequestBody(operation);

    logger.debug(`QingStor request uri: ${parsedOperation.uri}`);

    let parsedHeaders = this.parseRequestHeaders(operation);
    if (!_.isEmpty(parsedHeaders)) {
      parsedOperation.headers = parsedHeaders;
    }
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

    //Add Content-Type header
    parsedHeaders['Content-Type'] = _.result(
      operation.headers,
      'Content-Type',
      mime.lookup(this.parseRequestURI(operation).pathname) || 'application/octet-stream'
    );

    //Add Content-Length header
    let parsedBody = this.parseRequestBody(operation);
    if (parsedBody.constructor === fs.ReadStream) {
      let stats = fs.statSync(parsedBody.path);
      parsedHeaders['Content-Length'] = stats.size;
    } else {
      parsedHeaders['Content-Length'] = this.parseRequestBody(operation).length;
    }

    //Add User-Agent header
    parsedHeaders['User-Agent'] = util.format(
      'qingstor-sdk-js/%s (Node.js %s; %s %s)',
      global.version, process.version, process.platform, process.arch,
    );
    if (!_.isEmpty(this.config.additional_user_agent)) {
      parsedHeaders['User-Agent'] += util.format(' %s', this.config.additional_user_agent)
    }

    if (operation.api === 'DeleteMultipleObjects') {
      let h = createHash('md5');
      h.update(this.parseRequestBody(operation));
      parsedHeaders['Content-MD5'] = new Buffer(h.digest()).toString('base64')
    }
    return parsedHeaders;
  }

  parseRequestBody(operation) {
    let parsedBody = '';
    if (!_.isEmpty(operation.body)) {
      parsedBody = operation.body;
    } else if (!_.isEmpty(operation.elements)) {
      parsedBody = JSON.stringify(operation.elements);
    }
    return parsedBody;
  }

  parseRequestProperties(operation) {
    let parsedProperties = {};
    for (let i in operation.properties) {
      if (operation.properties.hasOwnProperty(i) && operation.properties[i] !== '') {
        parsedProperties[i] = encodeURI(operation.properties[i]);
      }
    }
    return parsedProperties;
  }

  parseRequestURI(operation) {
    let key;
    let parsedURI = url.parse(operation.uri, true);

    let parsedProperties = this.parseRequestProperties(operation);
    if (_.result(parsedProperties, 'zone')) {
      parsedURI.hostname = `${parsedProperties.zone}.${this.config.host}`
    } else {
      parsedURI.hostname = this.config.host;
    }
    parsedURI.protocol = this.config.protocol;
    parsedURI.port = this.config.port;

    for (key in parsedProperties) {
      if (parsedProperties.hasOwnProperty(key)) {
        parsedURI.pathname = parsedURI.pathname.replace(`<${key}>`, parsedProperties[key]);
        // Be compatible with browserify's url.parse
        parsedURI.pathname = parsedURI.pathname.replace(`%3C${key}%3E`, parsedProperties[key]);
        parsedURI.path = parsedURI.pathname;
        parsedURI.href = parsedURI.pathname;
      }
    }

    let parsedParams = this.parseRequestParams(operation);
    if (!_.isEmpty(parsedParams)) {
      for (key in parsedParams) {
        if (parsedParams.hasOwnProperty(key) && !_.isEmpty(parsedParams[key])) {
          parsedURI.query[key] = parsedParams[key];
        }
      }
      parsedURI.search = '?' + querystring.stringify(parsedURI.query);
    }

    return parsedURI;
  }
}


export default Builder;
