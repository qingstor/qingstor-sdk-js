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

import yaml from 'js-yaml';
import Config from '../src/config';

const should = require('chai').should();

describe('Config test', function() {
  it('loadDefaultConfig test', function() {
    const test = new Config({});
    test.access_key_id.should.equal('');
    test.secret_access_key.should.equal('');
    test.host.should.equal('qingstor.com');
    test.port.should.equal(443);
    test.protocol.should.equal('https');
    test.connection_retries.should.equal(3);
    test.log_level.should.equal('warn');
  });

  it('loadDefaultConfig with access key test', function() {
    const test = new Config({ access_key_id: 'ACCESS_KEY_ID_EXAMPLE', secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE' });

    test.access_key_id.should.equal('ACCESS_KEY_ID_EXAMPLE');
    test.secret_access_key.should.equal('SECRET_ACCESS_KEY_EXAMPLE');
    test.host.should.equal('qingstor.com');
    test.port.should.equal(443);
    test.protocol.should.equal('https');
    test.connection_retries.should.equal(3);
    test.log_level.should.equal('warn');
  });

  it('loadUserConfig test', function() {
    const test = new Config({});

    test
      .loadUserConfig()
      .should.to.contain.all.keys([
        'access_key_id',
        'connection_retries',
        'host',
        'log_level',
        'port',
        'protocol',
        'secret_access_key',
      ]);
  });

  it('loadConfig test', function() {
    const test = new Config({});
    const defaultConfigFileContent =
      '# QingStor Services Configuration\n' +
      '\n' +
      "access_key_id: 'ACCESS_KEY_ID_1'\n" +
      "secret_access_key: 'SECRET_ACCESS_KEY_1'\n" +
      "host: 'private.com'\n" +
      'port: 80\n' +
      "protocol: 'http'\n" +
      'connection_retries: 1\n' +
      '\n' +
      "# Valid levels are 'debug', 'info', 'warn', 'error', and 'fatal'.\n" +
      "log_level: 'info'\n";
    test.loadConfig(yaml.safeLoad(defaultConfigFileContent));

    test.access_key_id.should.equal('ACCESS_KEY_ID_1');
    test.secret_access_key.should.equal('SECRET_ACCESS_KEY_1');
    test.host.should.equal('private.com');
    test.port.should.equal(80);
    test.protocol.should.equal('http');
    test.connection_retries.should.equal(1);
    test.log_level.should.equal('info');
  });

  it('checkConfig test', function() {
    const test = new Config({});
    const notAllowedConfigFileContent =
      '# QingStor Services Configuration\n' +
      '\n' +
      "access_key_id: 'ACCESS_KEY_ID_1'\n" +
      "secret_access_key: 'SECRET_ACCESS_KEY_1'\n" +
      "host: 'private.com'\n" +
      'port: 80\n' +
      "protocol: 'http'\n" +
      'connection_retries: 1\n' +
      '\n' +
      '# Additional User-Agent\n' +
      'additional_user_agent: "()abc"\n' +
      "# Valid levels are 'debug', 'info', 'warn', 'error', and 'fatal'.\n" +
      "log_level: 'info'\n";
    try {
      test.loadConfig(yaml.safeLoad(notAllowedConfigFileContent));
    } catch (err) {
      err.should.be.instanceof(RangeError);
    }
  });
});
