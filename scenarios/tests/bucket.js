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

export default function () {
  this.setDefaultTimeout(10 * 1000);

  let config = new Config().loadConfigFromFilepath('tests/config.yaml');
  let test_config = yaml.safeLoad(fs.readFileSync('tests/test_config.yaml'));
  let test = new QingStor(config);
  let test_bucket = undefined;
  let test_data = undefined;

  this.When(/^initialize the bucket$/, callback => {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.put();
    callback();
  });
  this.Then(/^the bucket is initialized$/, callback => {
    callback(null, test_bucket.should.not.to.be.undefined);
  });

  this.When(/^put bucket$/, callback => {
    callback();
  });
  this.Then(/^put bucket status code is (\d+)$/, (statusCode, callback) => {
    callback(null, true);
  });

  this.When(/^put same bucket again$/, (callback) => {
    test_bucket.put((err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^put same bucket again status code is (\d+)$/, (statusCode, callback) => {
    callback(null, test_data.statusCode.toString().should.eql(statusCode));
  });

  this.When(/^list objects$/, (callback) => {
    test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.listObjects((err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^list objects status code is (\d+)$/, (statusCode, callback) => {
    callback(null, test_data.statusCode.toString().should.eql(statusCode));
  });
  this.Then(/^list objects keys count is (\d+)$/, (count, callback) => {
    callback(null, test_data.keys.length.toString().should.least(count));
  });

  this.When(/^head bucket$/, (callback) => {
    test_bucket.head((err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^head bucket status code is (\d+)$/, (statusCode, callback) => {
    callback(null, test_data.statusCode.toString().should.eql(statusCode));
  });

  this.When(/^delete multiple objects:$/, (string, callback) => {
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
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^delete multiple objects code is (\d+)$/, (statusCode, callback) => {
    callback(null, test_data.statusCode.toString().should.eql(statusCode));
  });

  this.When(/^get bucket statistics$/, (callback) => {
    test_bucket.getStatistics((err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^get bucket statistics status code is (\d+)$/, (statusCode, callback) => {
    callback(null, test_data.statusCode.toString().should.eql(statusCode));
  });
  this.Then(/^get bucket statistics status is "([^"]*)"$/, (status, callback) => {
    callback(null, test_data.status.toString().should.eql(status));
  });

  this.When(/^delete bucket$/, (callback) => {
    callback();
  });
  this.Then(/^delete bucket status code is (\d+)$/, (statusCode, callback) => {
    callback(null, true);
  });

  this.Given(/^an object created by initiate multipart upload$/, (callback) => {
    test_bucket.initiateMultipartUpload('list_multipart_uploads', (err, _) => {
      should.not.exist(err);
      callback();
    });
  });
  this.When(/^list multipart uploads$/, (callback) => {
    test_bucket.listMultipartUploads((err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^list multipart uploads count is (\d+)$/, (count, callback) => {
    callback(null, test_data.uploads.length.toString().should.eql(count));
  });
  this.When(/^list multipart uploads with prefix$/, (callback) => {
    test_bucket.listMultipartUploads({
      prefix: "list_multipart_uploads"
    }, (err, data) => {
      should.not.exist(err);
      test_data = data;
      callback();
    });
  });
  this.Then(/^list multipart uploads with prefix count is (\d+)$/, (count, callback) => {
    test_bucket.abortMultipartUpload('list_multipart_uploads', {
      upload_id: test_data.uploads[0].upload_id,
    }, (err, _) => {
      should.not.exist(err);
      callback(null, test_data.uploads.length.toString().should.eql(count));
    });
  });
}
