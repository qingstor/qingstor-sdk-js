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

import fs from "fs";
import yaml from "js-yaml";
import child_process from "child_process";
import { Config, QingStor } from "qingstor-sdk";

let should = require('chai').should();

module.exports = function() {
  this.setDefaultTimeout(10 * 1000);

  let config = new Config().loadUserConfig();
  let test_config = yaml.safeLoad(fs.readFileSync("test_config.yaml"));
  let test = new QingStor(config);
  let test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
  let test_multipart_object = undefined;
  let test_data = undefined;
  test_bucket.put();
  child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin_part bs=1048576 count=5');

  let init_output = undefined;
  this.When(/^initiate multipart upload with key "(.*)"$/, function(arg1, callback) {
    test_bucket.initiateMultipartUpload(arg1, {
      "Content-Type": "text/plain"
    }, function(err, data) {
      init_output = data;
      callback();
    }
    )
  });
  this.Then(/^initiate multipart upload status code is (\d+)$/, function(arg1, callback) {
    callback(null, init_output.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the first part with key "(.*)"$/, function(arg1, callback) {
    test_bucket.uploadMultipart(arg1, {
      'upload_id': init_output['upload_id'],
      'part_number': '0',
      'body': fs.createReadStream('/tmp/sdk_bin_part')
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^upload the first part status code is (\d+)$/, function(arg1, callback) {

    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the second part with key "(.*)"$/, function(arg1, callback) {
    test_bucket.uploadMultipart(arg1, {
      'upload_id': init_output['upload_id'],
      'part_number': '1',
      'body': fs.createReadStream('/tmp/sdk_bin_part')
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^upload the second part status code is (\d+)$/, function(arg1, callback) {

    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^upload the third part with key "(.*)"$/, function(arg1, callback) {
    test_bucket.uploadMultipart(arg1, {
      'upload_id': init_output['upload_id'],
      'part_number': '2',
      'body': fs.createReadStream('/tmp/sdk_bin_part')
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^upload the third part status code is (\d+)$/, function(arg1, callback) {

    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  let list_multipart_output = undefined;
  this.When(/^list multipart with key "(.*)"$/, function(arg1, callback) {
    test_bucket.listMultipart(arg1, {
      'upload_id': init_output['upload_id']
    }, function(err, data) {
      list_multipart_output = data;
      callback();
    });
  });
  this.Then(/^list multipart status code is (\d+)$/, function(arg1, callback) {

    callback(null, list_multipart_output.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^list multipart object parts count is (\d+)$/, function(arg1, callback) {

    callback(null, list_multipart_output.object_parts.length.toString().should.eql(arg1));
  });
  this.When(/^complete multipart upload with key "(.*)"$/, function(arg1, callback) {
    test_bucket.completeMultipartUpload(arg1, {
      'upload_id': init_output.upload_id,
      'etag': '"4072783b8efb99a9e5817067d68f61c6"',
      'object_parts': list_multipart_output.object_parts
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^complete multipart upload status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^abort multipart upload with key "(.*)"$/, function(arg1, callback) {
    test_bucket.abortMultipartUpload(arg1, {
      'upload_id': init_output['upload_id']
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^abort multipart upload status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.When(/^delete the multipart object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.deleteObject(arg1, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^delete the multipart object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
};
