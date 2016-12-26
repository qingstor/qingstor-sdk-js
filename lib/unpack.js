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

'use strict';

var Unpacker = function(res) {
  this.res = {};
  this.res.statusCode = res.statusCode;
  this.unpackResponseHeaders = function(res) {
    for (var i in res.headers) {
      this.res[i] = res.headers[i];
    }
  };

  this.unpackResponseBody = function(res) {
    var body = res.body;
    if (this.res['content-type'] === 'application/json') {
      if (body !== '') {
        for (var i in JSON.parse(body)) {
          this.res[i] = JSON.parse(body)[i];
        }
      }
    } else {
      this.res.body = body;
    }
  };

  this.unpackResponseHeaders(res);
  this.unpackResponseBody(res);

  return this.res;
};

exports.unpack = Unpacker;
