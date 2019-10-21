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
import yaml from 'js-yaml';
import {
  Config,
  QingStor
} from '../../dist/node/qingstor-sdk';

let should = require('chai').should();

module.exports = function() {
  this.setDefaultTimeout(10 * 1000);

  let config = new Config().loadConfigFromFilepath('tests/config.yaml');
  let test_config = yaml.safeLoad(fs.readFileSync('tests/test_config.yaml'));
  let test = new QingStor(config);
  let test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
  let test_data = undefined;
  test_bucket.put();

  this.When(/^put bucket external mirror:$/, function(string, callback) {
    test_bucket.putExternalMirror({
      source_site: JSON.parse(string)['source_site']
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^put bucket external mirror status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^get bucket external mirror$/, function(callback) {
    test_bucket.getExternalMirror(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^get bucket external mirror status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get bucket external mirror should have source_site "([^"]*)"$/, function(arg1, callback) {
    callback(null, test_data.source_site.toString().should.eql(arg1));
  });
  this.When(/^delete bucket external mirror$/, function(callback) {
    test_bucket.deleteExternalMirror(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^delete bucket external mirror status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
};
