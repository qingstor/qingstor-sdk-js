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


module.exports = function() {
  this.setDefaultTimeout(10 * 1000);

  var config = new Config().loadUserConfig();
  var test_config = yaml.safeLoad(fs.readFileSync("test_config.yaml"));
  var test = undefined;
  var test_res = undefined;
  this.When(/^initialize QingStor service$/, function(callback) {
    test = new Qingstor(config);
    callback();
  });
  this.Then(/^the QingStor service is initialized$/, function(callback) {
    callback(null, test.should.not.to.be.undefined);

  });
  this.When(/^list buckets$/, function(callback) {
    test.listBuckets({
      'location': 'pek3a'
    }, function(err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^list buckets status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
};
