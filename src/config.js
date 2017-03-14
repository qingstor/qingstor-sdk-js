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

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import logger from 'loglevel'

class Config {
  defaultConfigFileContent ='# QingStor Services Configuration\n'
  + '\n'
  + 'access_key_id: ""\n'
  + 'secret_access_key: ""\n'
  + 'host: "qingstor.com"\n'
  + 'port: 443\n'
  + 'protocol: "https"\n'
  + 'connection_retries: 3\n'
  + '\n'
  + '# Additional User-Agent\n'
  + 'additional_user_agent: ""\n'
  + '# Valid levels are "debug", "info", "warn", "error", and "fatal".\n'
  + 'log_level: "warn"\n';
  defaultConfigFile = '~/.qingstor/config.yaml';

  constructor(access_key_id, secret_access_key) {
    this.loadDefaultConfig();
    this.access_key_id = access_key_id === undefined ? '' : access_key_id;
    this.secret_access_key = secret_access_key === undefined ? '' : secret_access_key;
  }

  getUserConfigFilePath() {
    let home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    return `${home}${this.defaultConfigFile.replace('~', '')}`;
  }

  installDefaultUserConfig() {
    let filePath = this.getUserConfigFilePath();
    this.mkdirParentSync(path.dirname(filePath));
    fs.writeFileSync(filePath, this.defaultConfigFileContent);
  }

  checkConfig() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        if (key === 'additional_user_agent') {
          for (let v of this[key]) {
            let x = v.charCodeAt();
            // Allow space(32) to ~(126) in ASCII Table, exclude "(34).
            if (x < 32 || x > 126 || x == 32 || x == 34) {
              throw new RangeError(`additional_user_agent has not allowed value ${x}.`);
            }
          }
        }
      }
    }
  }

  loadConfig(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    logger.setLevel(this['log_level']);
    this.checkConfig();
    return this;
  }

  loadDefaultConfig() {
    let defaultUserConfig = yaml.safeLoad(this.defaultConfigFileContent);
    return this.loadConfig(defaultUserConfig);
  }

  loadUserConfig() {
    let filePath = this.getUserConfigFilePath();
    if (!fs.existsSync(filePath)) {
      this.installDefaultUserConfig();
    }
    return this.loadConfigFromFilepath(filePath)
  }

  loadConfigFromFilepath(filePath) {
    return this.loadConfig(yaml.safeLoad(fs.readFileSync(filePath)));
  }

  mkdirParentSync(dirPath, mode) {
    mode = typeof mode !== 'undefined' ? mode : '0755';

    if (!fs.existsSync(dirPath)) {
      let parentDir = path.dirname(dirPath);
      if (!fs.existsSync(parentDir)) {
        this.mkdirParentSync(parentDir);
      }
      fs.mkdirSync(dirPath, mode);
    }
  }
}


export default Config;
