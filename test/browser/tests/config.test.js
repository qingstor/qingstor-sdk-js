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

describe('Config test', function () {
  it('loadConfig test', function () {
    const Config = qingstor_sdk.Config;
    const test_config = new Config().loadConfig(qingstor_config);
    test_config.should.to.contain.all.keys([
      'access_key_id',
      'secret_access_key',
      'host',
      'port',
      'protocol',
      'connection_retries',
      'log_level',
    ]);
  });

  it('parseEndpoint test', function() {
    const tests = [
      ['http://qingstor.com', 'http', 'qingstor.com', ''],
      ['https://qingstor.com', 'https', 'qingstor.com', ''],
      ['https://qingstor.com:443', 'https', 'qingstor.com', '443'],
      ['qingstor.com', 'https', 'qingstor.com', 443],
    ];

    tests.map(function([endpoint, protocol, host, port]) {
      const test = new Config({ endpoint });

      test.protocol.should.equal(protocol);
      test.host.should.equal(host);
      test.port.should.equal(port);
    });
  });
});
