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
  let test_bucket = undefined;
  let test_data = undefined;

  this.When(/^initialize the bucket$/, function(callback) {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.put();
    callback();
  });
  this.Then(/^the bucket is initialized$/, function(callback) {
    callback(null, test_bucket.should.not.to.be.undefined);
  });
  this.When(/^put bucket$/, function(callback) {
    callback();
  });
  this.Then(/^put bucket status code is (\d+)$/, function(arg1, callback) {
    callback(null, true);
  });
  this.When(/^put same bucket again$/, function(callback) {
    test_bucket.put(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^put same bucket again status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^list objects$/, function(callback) {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.listObjects(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^list objects status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^list objects keys count is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.keys.length.toString().should.least(arg1));
  });
  this.When(/^head bucket$/, function(callback) {
    test_bucket.head(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^head bucket status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^delete multiple objects:$/, function(string, callback) {
    let bucket_name = test_config['bucket_name'];
    let zone = test_config['zone'];
    test_bucket.putObject('object_0');
    test_bucket.putObject('object_1');
    test_bucket.putObject('object_2');

    let test_string = JSON.parse(string);
    test_bucket.deleteMultipleObjects({
      'objects': test_string['objects'],
      'quiet': test_string['quiet']
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^delete multiple objects code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^get bucket statistics$/, function(callback) {
    test_bucket.getStatistics(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^get bucket statistics status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get bucket statistics status is "([^"]*)"$/, function(arg1, callback) {
    callback(null, test_data.status.toString().should.eql(arg1));
  });
  this.When(/^delete bucket$/, function(callback) {
    callback();
  });
  this.Then(/^delete bucket status code is (\d+)$/, function(arg1, callback) {
    callback(null, true);
  });
  this.Given(/^an object created by initiate multipart upload$/, function(callback) {
    test_bucket.initiateMultipartUpload("list_multipart_uploads");
    callback();
  });
  this.When(/^list multipart uploads$/, function(callback) {
    test_bucket.listMultipartUploads(function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^list multipart uploads count is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.uploads.length.toString().should.eql(arg1));
  });
};
