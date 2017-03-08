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

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import logger from 'loglevel'

class Config {
  defaultConfigFileContent='# QingStor Services Configuration\n'
  + '\n'
  + 'access_key_id: ""\n'
  + 'secret_access_key: ""\n'
  + 'host: "qingstor.com"\n'
  + 'port: 443\n'
  + 'protocol: "https"\n'
  + 'connection_retries: 3\n'
  + '\n'
  + '# Valid levels are "debug", "info", "warn", "error", and "fatal".\n'
  + 'log_level: "warn"\n';
  defaultConfigFile = '~/.qingstor/config.yaml';

  constructor(access_key_id, secret_access_key) {
    this.access_key_id = access_key_id === undefined ? '' : access_key_id;
    this.secret_access_key = secret_access_key === undefined ? '' : secret_access_key;
    this.host = 'qingstor.com';
    this.port = 443;
    this.protocol = 'https';
    this.connection_retries = 3;
    this.log_level = 'warn';
  }

  getUserConfigFilePath() {
    let home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    return home + this.defaultConfigFile.replace('~', '');
  }

  isFileExist(filePath) {
    try {
      fs.accessSync(filePath, fs.R_OK | fs.W_OK);
    } catch ($e) {
      return false;
    }
    return true;
  }

  installDefaultUserConfig() {
    let filePath = this.getUserConfigFilePath();
    fs.mkdirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, this.defaultConfigFileContent);
  }

  loadConfig(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    logger.setLevel(this['log_level']);
    return this;
  }

  loadDefaultConfig() {
    let defaultUserConfig = yaml.safeLoad(this.defaultConfigFileContent);
    return this.loadConfig(defaultUserConfig);
  }

  loadUserConfig() {
    let filePath = this.getUserConfigFilePath();
    if (!this.isFileExist(filePath)) {
      this.installDefaultUserConfig();
    }
    let config = this.loadConfigFromFilepath(filePath);
    return this.loadConfig(config);
  }

  loadConfigFromFilepath(filePath) {
    return yaml.safeLoad(fs.readFileSync(filePath));
  }
}


export default Config;
