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

var child_process = require("child_process");
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
  var test_multipart_object = undefined;
  var test_res = undefined;
  var test_data = undefined;
  test_bucket.put();

  var init_output = undefined;
  this.When(/^initiate multipart upload with key "([^"]*)"$/, function (arg1, callback) {
    test_bucket.initiateMultipartUpload(arg1, {
        "Content-Type": "text/plain"
      }, function (err, res) {
        init_output = res;
        callback();
      }
    )
  });
  this.Then(/^initiate multipart upload status code is (\d+)$/, function (arg1, callback) {
    callback(null, init_output.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the first part$/, function (callback) {
    child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin_part_0 bs=1048576 count=5', function (error, stdout, stderr) {
      if (error) {
        console.error('exec error: ' + error);
        return;
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      test_res = test_bucket.uploadMultipart('test_object_multipart', {
        'upload_id': init_output['upload_id'],
        'part_number': '0',
        'body': fs.readFileSync('/tmp/sdk_bin_part_0')
      }, function (err, res) {
        test_res = res;
        callback();
      })
    })
    ;
  });
  this.Then(/^upload the first part status code is (\d+)$/, function (arg1, callback) {

    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the second part$/, function (callback) {
    child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin_part_1 bs=1048576 count=5', function (error, stdout, stderr) {
      if (error) {
        console.error('exec error: ' + error);
        return;
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      test_res = test_bucket.uploadMultipart('test_object_multipart', {
        'upload_id': init_output['upload_id'],
        'part_number': '1',
        'body': fs.readFileSync('/tmp/sdk_bin_part_1')
      }, function (err, res) {
        test_res = res;
        callback();
      })
    })
    ;
  });
  this.Then(/^upload the second part status code is (\d+)$/, function (arg1, callback) {

    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the third part$/, function (callback) {
    child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin_part_2 bs=1048576 count=5', function (error, stdout, stderr) {
      if (error) {
        console.error('exec error: ' + error);
        return;
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      test_bucket.uploadMultipart('test_object_multipart', {
        'upload_id': init_output['upload_id'],
        'part_number': '2',
        'body': fs.readFileSync('/tmp/sdk_bin_part_2')
      }, function (err, res) {
        test_res = res;
        callback();
      });
    })
    ;
  });
  this.Then(/^upload the third part status code is (\d+)$/, function (arg1, callback) {

    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  var list_multipart_output = undefined;
  this.When(/^list multipart$/, function (callback) {
    test_bucket.listMultipart('test_object_multipart', {
      'upload_id': init_output['upload_id']
    }, function (err, res, data) {
      list_multipart_output = res;
      callback();
    });
  });
  this.Then(/^list multipart status code is (\d+)$/, function (arg1, callback) {

    callback(null, list_multipart_output.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^list multipart object parts count is (\d+)$/, function (arg1, callback) {

    callback(null, list_multipart_output.object_parts.length.toString().should.eql(arg1));
  });
  this.When(/^complete multipart upload$/, function (callback) {
    test_bucket.completeMultipartUpload('test_object_multipart', {
      'upload_id': init_output.upload_id,
      'etag': '"4072783b8efb99a9e5817067d68f61c6"',
      'object_parts': list_multipart_output.object_parts
    }, function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^complete multipart upload status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^abort multipart upload$/, function (callback) {
    test_bucket.abortMultipartUpload('test_object_multipart', {
      'upload_id': init_output['upload_id']
    }, function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^abort multipart upload status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });
  this.When(/^delete the multipart object$/, function (callback) {
    test_bucket.deleteObject('test_object_multipart', function (err, res) {
      test_res = res;
      callback();
    });
  });
  this.Then(/^delete the multipart object status code is (\d+)$/, function (arg1, callback) {
    callback(null, test_res.statusCode.toString().should.eql(arg1));
  });

  test_bucket.delete();
};
