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

var isNode = require('./lib/utils').isNode;
require("babel-polyfill");

// To add to window
if (!isNode) {
  if (!window.Promise) {
    window.Promise = require('promise-polyfill');
  }
}

module.exports = {
  'QingStor': require('./lib/qingstor/qingstor'),
  'Config': require('./lib/config'),
  'Request': require('./lib/request'),
  'Signer': require('./lib/sign')
};
