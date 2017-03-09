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

import fs from "fs";
import yaml from "js-yaml";
import { Config, QingStor } from "qingstor-sdk";

let should = require('chai').should();

module.exports = function() {
  this.setDefaultTimeout(10 * 1000);

  let config = new Config().loadUserConfig();
  let test_config = yaml.safeLoad(fs.readFileSync("test_config.yaml"));
  let test = new QingStor(config);
  let test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
  let test_data = undefined;
  test_bucket.put();

  this.When(/^put bucket CORS:$/, function(string, callback) {
    test_bucket.putCORS({
      'cors_rules': JSON.parse(string)['cors_rules']
    }, function(err, res) {
      test_data = res;
      callback();
    });
  });
  this.Then(/^put bucket CORS status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^get bucket CORS$/, function(callback) {
    test_bucket.getCORS(function(err, res) {
      test_data = res;
      callback();
    });
  });
  this.Then(/^get bucket CORS status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get bucket CORS should have allowed origin "([^"]*)"$/, function(arg1, callback) {
    let ok = test_data.cors_rules.some(function(item) {
      return item.allowed_origin === arg1;
    });
    callback(null, ok.should.eql(true));
  });
  this.When(/^delete bucket CORS$/, function(callback) {
    test_bucket.deleteCORS(function(err, res) {
      test_data = res;
      callback();
    });
  });
  this.Then(/^delete bucket CORS status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
};
