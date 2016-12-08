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

"use strict";

var Config = require("qingstor-sdk").Config;
var Qingstor = require('qingstor-sdk').QingStor;
var yaml = require('js-yaml');
var fs = require('fs');
var should = require('chai').should();


module.exports = function () {
  this.setDefaultTimeout(10 * 1000);

  var config = new Config().loadUserConfig();
  var test_config = yaml.safeLoad(fs.readFileSync("test_config.yaml"));
  var test = new Qingstor(config);
  var test_bucket = undefined;
  var test_res = undefined;
  var test_data = undefined;

  this.When(/^initialize the bucket$/, function (callback) {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    callback();
  });
  this.Then(/^the bucket is initialized$/, function (callback) {
    callback(null, test_bucket.should.not.to.be.undefined);
  });
  this.When(/^put bucket$/, function (callback) {
    test_bucket.put(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^put bucket status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^put same bucket again$/, function (callback) {
    test_bucket.put(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^put same bucket again status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^list objects$/, function (callback) {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.listObjects({}, function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^list objects status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^list objects keys count is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.keys.length.toString().should.least(arg1));
  });
  this.When(/^head bucket$/, function (callback) {
    test_bucket.head(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^head bucket status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^delete multiple objects:$/, function (string, callback) {
    var bucket_name = test_config['bucket_name'];
    var zone = test_config['zone'];
    test_bucket.putObject('object_0');
    test_bucket.putObject('object_1');
    test_bucket.putObject('object_2');

    var test_string = JSON.parse(string);
    var h = require("crypto").createHash('md5').update(
      JSON.stringify({
        'objects': test_string['objects'],
        'quiet': test_string['quiet']
      })
    );
    var md5 = new Buffer(h.digest()).toString("base64");
    test_bucket.deleteMultipleObjects({
      'objects': test_string['objects'],
      'quiet': test_string['quiet'],
      'Content-MD5': md5
    }, function (err, res, data) {
      test_res = res;
      test_data = data;
      console.log(data);
      callback();
    });
  });
  this.Then(/^delete multiple objects code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^get bucket statistics$/, function (callback) {
    test_bucket.getStatistics(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^get bucket statistics status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get bucket statistics status is "([^"]*)"$/, function (arg1, callback) {
    callback(null, test_res.status.toString().should.eql(arg1));
  });
  this.When(/^delete bucket$/, function (callback) {
    test_bucket.delete(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^delete bucket status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
};
