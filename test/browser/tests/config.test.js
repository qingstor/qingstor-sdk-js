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

describe('Config test', function() {
  it('loadConfig test', function() {
    var Config = require('qingstor-sdk').Config;
    var test_config = new Config().loadConfig({
      'access_key_id': 'test_access_key_id',
      'secret_access_key': 'test_secret_access_key',
      'host': 'qingstor.com',
      'port': 443,
      'protocol': 'https',
      'connection_retries': 3,
      'log_level': 'warn'
    });
    test_config.should.to.contain.all.keys([
      'access_key_id',
      'secret_access_key',
      'host',
      'port',
      'protocol',
      'connection_retries',
      'log_level'
    ]);
  });
});
