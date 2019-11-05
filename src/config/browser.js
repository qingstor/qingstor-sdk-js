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

import logger from 'loglevel';

import common from './common';

const USE_AK_SK_WARN = [
  'It is highly recommended NOT to use access_key_id and secret_access_key ',
  'on client scripts. Please deploy a signature server and get authorization from it, ',
  'visit https://github.com/yunify/qingstor-sdk-js',
].join('');

const DEFAULT_CONFIG = {
  host: 'qingstor.com',
  port: 443,
  protocol: 'https',
  connection_retries: 3,
  // Valid levels are "debug", "info", "warn", "error", and "fatal"
  log_level: 'warn',
};

class Config {
  constructor(options) {
    Object.assign(this, common(this));

    this.loadDefaultConfig();
    this.loadConfig(options);

    if (!this.signature_server) {
      logger.warn(USE_AK_SK_WARN);
    }
  }

  loadDefaultConfig() {
    this.loadConfig(DEFAULT_CONFIG);
  }
}

export default Config;
