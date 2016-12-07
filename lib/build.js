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

"use strict";

var _ = require('lodash/core');
var logger = require('loglevel');
var mime = require('mime');
var util = require('util');
var url = require('url');
var querystring = require('querystring');

var Builder = function(config, operation) {
  this.config = config;
  this.operation = operation;

  this.parse = function(operation) {
    var parsedOperation = {};
    parsedOperation.method = operation.method;
    parsedOperation.uri = url.format(this.parseRequestUri(operation));

    var parsedBody = this.parseRequestBody(operation);
    if (parsedBody !== '') {
      parsedOperation.body = parsedBody;
    }

    var parsedHeaders = this.parseRequestHeaders(operation);
    if (!_.isEmpty(parsedHeaders)) {
      parsedOperation.headers = parsedHeaders;
    }
    return parsedOperation;
  };

  this.parseRequestParams = function(operation) {
    var parsedParams = {};
    for (var i in operation.params) {
      if (operation.params[i] !== '') {
        parsedParams[i] = operation.params[i];
      }
    }
    return parsedParams;
  };

  this.parseRequestHeaders = function(operation) {
    var parsedHeaders = {};
    for (var i in operation.headers) {
      if (operation.headers[i] !== '') {
        parsedHeaders[i] = operation.headers[i];
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
    parsedHeaders['Content-Length'] = this.parseRequestBody(operation).length;

    //Add User-Agent header
    require('./version');
    parsedHeaders['User-Agent'] = util.format(
      'QingStorSDK/%s (Node.js %s; %s)',
      global.version,
      process.version,
      process.platform
    );

    return parsedHeaders;
  };

  this.parseRequestBody = function(operation) {
    var parsedBody = '';
    if (!_.isEmpty(operation.body)) {
      parsedBody = operation.body;
    } else if (!_.isEmpty(operation.elements)) {
      parsedBody = JSON.stringify(operation.elements);
    }
    return parsedBody;
  };

  this.parseRequestProperties = function(operation) {
    var parsedProperties = {};
    for (var i in operation.properties) {
      if (operation.properties[i] !== '') {
        parsedProperties[i] = operation.properties[i];
      }
    }
    return parsedProperties;
  };

  this.parseRequestUri = function(operation) {
    var key;
    var parsedUri = url.parse(operation.uri, true);

    var parsedProperties = this.parseRequestProperties(operation);
    if (_.result(parsedProperties, 'zone')) {
      parsedUri.hostname = parsedProperties.zone + '.' + this.config.host;
    } else {
      parsedUri.hostname = this.config.host;
    }
    parsedUri.protocol = this.config.protocol;
    parsedUri.port = this.config.port;

    if (!_.isEmpty(parsedProperties)) {
      for (key in parsedProperties) {
        parsedUri.pathname = parsedUri.pathname.replace('<' + key + '>', parsedProperties[key]);
      }
    }

    var parsedParams = this.parseRequestParams(operation);
    if (!_.isEmpty(parsedParams)) {
      for (key in parsedParams) {
        if (!_.isEmpty(parsedParams[key])) {
          parsedUri.query[key] = parsedParams[key];
        }
      }
      parsedUri.search = '?' + querystring.stringify(parsedUri.query);
    }

    return parsedUri;
  }
};

module.exports = Builder;