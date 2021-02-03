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

describe('Config test', function () {
  it('loadDefaultConfig test', function () {
    const test = new Config({});
    const config = test.loadDefaultConfig();

    config.access_key_id.should.equal('');
    config.secret_access_key.should.equal('');
    config.host.should.equal('qingstor.com');
    config.port.should.equal(443);
    config.protocol.should.equal('https');
    config.connection_retries.should.equal(3);
    config.log_level.should.equal('warn');
  });

  it('getUserConfigFilePath test', function() {
    const test = new Config();

    test.getUserConfigFilePath().should.to.contain('.qingstor/config.yaml');
  });

  it('getUserConfigFilePath with ENV test', function() {
    process.env.QINGSTOR_CONFIG_PATH = '/tmp/config.yaml';

    const test = new Config();

    test.getUserConfigFilePath().should.equal('/tmp/config.yaml');
  });

  it('overrideConfigByFile test', function () {
    const test = new Config({});

    test
      .overrideConfigByFile()
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

  it('overrideConfigByENV test', function() {
    process.env.QINGSTOR_ACCESS_KEY_ID = 'example_access_key_id';
    process.env.QINGSTOR_SECRET_ACCESS_KEY = 'example_secret_access_key';

    const test = new Config();

    test.access_key_id.should.equal('example_access_key_id');
    test.secret_access_key.should.equal('example_secret_access_key');
  });

  it('overrideConfigByOptions with access key test', function () {
    const test = new Config({ access_key_id: 'example_access_key_id', secret_access_key: 'example_secret_access_key' });

    test.access_key_id.should.equal('example_access_key_id');
    test.secret_access_key.should.equal('example_secret_access_key');
    test.host.should.equal('qingstor.com');
    test.port.should.equal(443);
    test.protocol.should.equal('https');
    test.connection_retries.should.equal(3);
    test.log_level.should.equal('warn');
  });

  it('loadConfig test', function () {
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

  it('checkConfig test', function () {
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
