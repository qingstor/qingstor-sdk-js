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
import mime from 'mime';
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
    parsedOperation.uri = url.format(this.parseRequestUri(operation));
    logger.debug('QingStor request parsedUri: ' + parsedOperation.uri);
    parsedOperation.body = this.parseRequestBody(operation);

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
      mime.lookup(this.parseRequestUri(operation).pathname)
    );

    //Add Content-Type header
    let parsedBody = this.parseRequestBody(operation);
    if (parsedBody instanceof fs.ReadStream) {
      let stats = fs.statSync(parsedBody.path);
      parsedHeaders['Content-Length'] = stats.size;
    } else {
      parsedHeaders['Content-Length'] = this.parseRequestBody(operation).length;
    }

    //Add User-Agent header
    parsedHeaders['User-Agent'] = util.format(
      'qingstor-sdk-js/%s (Node.js %s; %s)',
      global.version,
      process.version,
      process.platform
    );

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

  parseRequestUri(operation) {
    let key;
    let parsedUri = url.parse(operation.uri, true);

    let parsedProperties = this.parseRequestProperties(operation);
    if (_.result(parsedProperties, 'zone')) {
      parsedUri.hostname = parsedProperties.zone + '.' + this.config.host;
    } else {
      parsedUri.hostname = this.config.host;
    }
    parsedUri.protocol = this.config.protocol;
    parsedUri.port = this.config.port;

    for (key in parsedProperties) {
      if (parsedProperties.hasOwnProperty(key)) {
        parsedUri.pathname = parsedUri.pathname.replace('<' + key + '>', parsedProperties[key]);
      }
    }

    let parsedParams = this.parseRequestParams(operation);
    if (!_.isEmpty(parsedParams)) {
      for (key in parsedParams) {
        if (parsedParams.hasOwnProperty(key) && !_.isEmpty(parsedParams[key])) {
          parsedUri.query[key] = parsedParams[key];
        }
      }
      parsedUri.search = '?' + querystring.stringify(parsedUri.query);
    }

    return parsedUri;
  }
}


export default Builder;
