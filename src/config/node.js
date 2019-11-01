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

import common from './common';

const defaultConfigFileContent = [
  '# QingStor Services Configuration',
  '',
  'access_key_id: ""',
  'secret_access_key: ""',
  'host: "qingstor.com"',
  'port: 443',
  'protocol: "https"',
  'connection_retries: 3',
  '',
  '# Additional User-Agent',
  'additional_user_agent: ""',
  '# Valid levels are "debug", "info", "warn", "error", and "fatal".',
  'log_level: "warn"',
].join('\n');

const defaultConfigFile = '~/.qingstor/config.yaml';

class Config {
  constructor({ access_key_id, secret_access_key }) {
    Object.assign(this, common(this));

    this.loadDefaultConfig();
    this.access_key_id = access_key_id === undefined ? '' : access_key_id;
    this.secret_access_key = secret_access_key === undefined ? '' : secret_access_key;
  }

  getUserConfigFilePath() {
    const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
    return `${home}${defaultConfigFile.replace('~', '')}`;
  }

  installDefaultUserConfig() {
    const filePath = this.getUserConfigFilePath();
    this.mkdirParentSync(path.dirname(filePath));
    fs.writeFileSync(filePath, defaultConfigFileContent);
  }

  loadDefaultConfig() {
    const defaultUserConfig = yaml.safeLoad(defaultConfigFileContent);
    return this.loadConfig(defaultUserConfig);
  }

  loadUserConfig() {
    const filePath = this.getUserConfigFilePath();
    if (!fs.existsSync(filePath)) {
      this.installDefaultUserConfig();
    }
    return this.loadConfigFromFilepath(filePath);
  }

  loadConfigFromFilepath(filePath) {
    return this.loadConfig(yaml.safeLoad(fs.readFileSync(filePath)));
  }

  mkdirParentSync(dirPath, mode) {
    mode = typeof mode !== 'undefined' ? mode : '0755';

    if (!fs.existsSync(dirPath)) {
      const parentDir = path.dirname(dirPath);
      if (!fs.existsSync(parentDir)) {
        this.mkdirParentSync(parentDir);
      }
      fs.mkdirSync(dirPath, mode);
    }
  }
}

export default Config;
