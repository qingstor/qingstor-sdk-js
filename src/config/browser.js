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

class Config {
  constructor(access_key_id, secret_access_key) {
    this.loadDefaultConfig();
    this.access_key_id = access_key_id === undefined ? '' : access_key_id;
    this.secret_access_key = secret_access_key === undefined ? '' : secret_access_key;
  }

  getUserConfigFilePath() {
    return null;
  }

  installDefaultUserConfig() {
    return;
  }

  checkConfig() {
    for (let key of Object.keys(this)) {
      if (key === 'additional_user_agent') {
        for (let v of this[key]) {
          let x = v.charCodeAt();
          // Allow space(32) to ~(126) in ASCII Table, exclude "(34).
          if (x < 32 || x > 126 || x === 32 || x === 34) {
            throw new RangeError(`additional_user_agent has not allowed value ${x}.`);
          }
        }
      }
    }
  }

  loadConfig(data) {
    for (let key of Object.keys(data)) {
      this[key] = data[key];
    }
    logger.setLevel(this['log_level']);
    this.checkConfig();
    return this;
  }

  loadDefaultConfig() {
    return;
  }

  loadUserConfig() {
    return;
  }

  loadConfigFromFilepath() {
    return;
  }

  mkdirParentSync() {
    return;
  }
}

export default Config;
