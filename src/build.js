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

import version from './version';
import util from 'util';
import logger from 'loglevel';
import md5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';

import { fixedEncodeURIComponent, buildUri, filterUnsafeHeaders } from './utils';

const METHODS_SHOULD_NOT_INCLUDE_BODY = ['GET', 'HEAD'];

class Builder {
  constructor(config, operation) {
    this.config = config;
    this.operation = operation;
  }

  parse() {
    const parsedOperation = this.parseRequestURI(this.operation);
    parsedOperation.method = this.operation.method;
    parsedOperation.params = this.parseRequestParams(this.operation);
    parsedOperation.headers = this.parseRequestHeaders(this.operation);
    parsedOperation.body = this.parseRequestBody(this.operation);

    logger.debug(`QingStor request uri: ${parsedOperation.uri}`);

    return parsedOperation;
  }

  parseRequestParams(operation) {
    const parsedParams = {};
    for (const i of Object.keys(operation.params)) {
      if (operation.params[i] !== undefined && operation.params[i].toString() !== '') {
        parsedParams[i] = operation.params[i].toString();
      }
    }
    return parsedParams;
  }

  parseRequestHeaders(operation) {
    const parsedHeaders = {};
    for (const i of Object.keys(operation.headers)) {
      if (operation.headers[i] !== undefined && operation.headers[i].toString() !== '') {
        parsedHeaders[i] = encodeURI(operation.headers[i]);
      }
    }

    // always use x-qs-date instead of date for compatibility
    parsedHeaders['x-qs-date'] = operation.headers['x-qs-date'] || new Date().toUTCString();

    if (!METHODS_SHOULD_NOT_INCLUDE_BODY.includes(operation.method)) {
      // Add Content-Type header
      if (operation.headers['content-type']) {
        parsedHeaders['content-type'] = operation.headers['content-type'];
      } else if (operation.body && operation.body.type) {
        // get content-type from body
        parsedHeaders['content-type'] = operation.body.type;
      } else if (Object.keys(operation.elements).length) {
        parsedHeaders['content-type'] = 'application/json';
      } else {
        parsedHeaders['content-type'] = 'application/octet-stream';
      }
    }

    // Add user-agent header
    parsedHeaders['user-agent'] = util.format(
      'qingstor-sdk-js/%s (Node.js %s; %s %s)',
      version,
      process.version,
      process.platform,
      process.arch
    );

    if (this.config.additional_user_agent) {
      parsedHeaders['user-agent'] += util.format(' %s', this.config.additional_user_agent);
    }

    // Add helper for DeleteMultipleObjects
    if (operation.api === 'DeleteMultipleObjects') {
      parsedHeaders['content-md5'] = Base64.stringify(md5(this.parseRequestBody(operation)));
    }

    return filterUnsafeHeaders(parsedHeaders);
  }

  parseRequestBody(operation) {
    let parsedBody = undefined;
    if (operation.body !== undefined) {
      parsedBody = operation.body;
    } else if (Object.keys(operation.elements).length !== 0) {
      parsedBody = JSON.stringify(operation.elements);
    }
    return parsedBody;
  }

  parseRequestProperties(operation) {
    const parsedProperties = {};
    for (const i of Object.keys(operation.properties)) {
      if (operation.properties[i] !== undefined && operation.properties[i].toString() !== '') {
        parsedProperties[i] = fixedEncodeURIComponent(operation.properties[i]);
      }
    }
    return parsedProperties;
  }

  parseRequestURI(operation) {
    let path = operation.uri;
    let endpoint = '';
    const parsedProperties = this.parseRequestProperties(operation);

    if (this.config.endpoint) {
      endpoint = this.config.endpoint;
    } else if (parsedProperties['zone']) {
      endpoint = `${this.config.protocol}://${parsedProperties.zone}.${this.config.host}:${this.config.port}`;
    } else {
      endpoint = `${this.config.protocol}://${this.config.host}:${this.config.port}`;
    }

    for (const key of Object.keys(parsedProperties)) {
      path = path.replace(`<${key}>`, parsedProperties[key]);
    }

    const parsedParams = this.parseRequestParams(operation);
    const parsedUri = buildUri(endpoint, path, parsedParams);

    return {
      endpoint,
      path,
      uri: parsedUri,
    };
  }
}

export default Builder;
