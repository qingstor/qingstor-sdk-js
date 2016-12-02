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

var Config = require('../lib/config');
var should = require('chai').should();

describe('Config test', function () {
    var test = new Config();
    it('isFileExist test', function () {
        fs = require('fs');
        fs.writeFileSync('/tmp/exist_file', 'test_data');
        test.isFileExist('/tmp/exist_file').should.equal(true);
        test.isFileExist('/tmp/not_exist_file').should.equal(false);
    });
    it('loadUserConfig test', function () {
        test.loadUserConfig()
            .should
            .to
            .contain
            .all
            .keys([
                'access_key_id',
                'connection_retries',
                'host',
                'log_level',
                'port',
                'protocol',
                'secret_access_key'
            ]);
    });
    it('loadConfig test', function () {
        var defaultConfigFileContent = (function () { /*
         # QingStor Services Configuration

         access_key_id: 'ACCESS_KEY_ID'
         secret_access_key: 'SECRET_ACCESS_KEY'

         host: 'qingstor.com'
         port: 443
         protocol: 'https'
         connection_retries: 3

         # Valid levels are 'debug', 'info', 'warn', 'error', and 'fatal'.
         log_level: 'warn'
         */} ).toString().split('\n').slice(1, -1).join('\n');
        test.loadConfig(defaultConfigFileContent)
            .should
            .to
            .contain
            .all
            .keys([
                'access_key_id',
                'connection_retries',
                'host',
                'log_level',
                'port',
                'protocol',
                'secret_access_key'
            ]);
    })
});
