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
const configPathEnvName = 'QINGSTOR_CONFIG_PATH';
const accessKeyIdEnvName = 'QINGSTOR_ACCESS_KEY_ID';
const secretAccessKeyEnvName = 'QINGSTOR_SECRET_ACCESS_KEY';

class Config {
  constructor(options) {
    Object.assign(this, common(this));

    this.loadDefaultConfig();

    this.overrideConfigByFile();
    this.overrideConfigByENV();
    this.overrideConfigByOptions(options);
  }

  loadDefaultConfig() {
    const defaultUserConfig = yaml.safeLoad(defaultConfigFileContent);

    return this.loadConfig(defaultUserConfig);
  }

  getUserConfigFilePath() {
    let configFile = defaultConfigFile;

    if (process.env[configPathEnvName]) {
      configFile = process.env[configPathEnvName];
    }

    return configFile.replace('~/', `${process.env.HOME || process.env.USERPROFILE}/`);
  }

  installDefaultUserConfig() {
    const filePath = this.getUserConfigFilePath();

    this.mkdirParentSync(path.dirname(filePath));
    fs.writeFileSync(filePath, defaultConfigFileContent);
  }

  loadConfigFromFilepath(filePath) {
    const configs = yaml.safeLoad(fs.readFileSync(filePath));

    return this.loadConfig(configs);
  }

  overrideConfigByFile() {
    const filePath = this.getUserConfigFilePath();

    if (!fs.existsSync(filePath)) {
      this.installDefaultUserConfig();
    }

    return this.loadConfigFromFilepath(filePath);
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

  overrideConfigByENV() {
    const config = {};

    if (process.env[accessKeyIdEnvName]) {
      config.access_key_id = process.env[accessKeyIdEnvName];
    }

    if (process.env[secretAccessKeyEnvName]) {
      config.secret_access_key = process.env[secretAccessKeyEnvName];
    }

    return this.loadConfig(config);
  }

  overrideConfigByOptions(options) {
    return this.loadConfig(options);
  }
}

export default Config;
