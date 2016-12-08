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
  var test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
  var test_res = undefined;
  var test_data = undefined;
  test_bucket.put();

  this.When(/^put bucket ACL:$/, function (string, callback) {
    console.log(JSON.parse(string)['acl']);
    test_bucket.putACL({
      'acl': JSON.parse(string)['acl']
    }, function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^put bucket ACL status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^get bucket ACL$/, function (callback) {
    test_bucket.getACL(function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^get bucket ACL status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get bucket ACL should have grantee name "([^"]*)"$/, function (arg1, callback) {
    var ok = false;
    for (var i in test_res.acl) {
      if (test_res.acl[i]['grantee']['name'] === arg1) {
        ok = true;
      }
    }
    callback(null, ok.should.eql(true));
  });

  test_bucket.delete();
};
