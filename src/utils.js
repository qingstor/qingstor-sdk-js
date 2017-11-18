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

import { stringify } from 'querystring';

export default {
  // To be more stringent in adhering to RFC 3986 (which reserves !, ', (, ), and *),
  // even though these characters have no formalized URI delimiting uses
  fixedEncodeURIComponent: (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  },
  buildUri: (endpoint, path, params) => {
    let parsedUri = endpoint + path;
    if (Object.keys(params).length !== 0) {
      let separator = path.includes('?') ? '&' : '?';
      parsedUri += separator + stringify(params);
    }
    return parsedUri;
  },
  isFunction: (fn) => {
    return (typeof fn !== 'undefined' ? Object.prototype.toString.call(fn) : 0) === '[object Function]';
  }
}
