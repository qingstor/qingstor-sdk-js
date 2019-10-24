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
import path from 'path';
import yaml from 'js-yaml';
import assert from 'assert';
import { Given, When, Then } from 'cucumber';

import Config from '../../src/config/node';
import QingStor from '../../src/qingstor/qingstor';

const { bucket_name: bucketName, zone } = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './test_config.yaml')));
const config = new Config().loadConfigFromFilepath(path.join(__dirname, './config.yaml'));
const qingstor = new QingStor(config);

let bucket;

When('initialize the bucket', function() {
  bucket = qingstor.Bucket(bucketName, zone);
});

Then('the bucket is initialized', function() {
  assert.equal(bucketName, bucket.properties['bucket-name']);
  assert.equal(zone, bucket.properties.zone);
});

When('put bucket', function() {
  return bucket
    .put()
    .then(({ status }) => {
      this.putResponseStatus = status;
    })
    .catch(({ response }) => {
      console.error('put bucket error', response.data);
      this.putResponseStatus = response.status;
    });
});

Then('put bucket status code is {int}', function(int) {
  assert.equal(this.putResponseStatus, int);
});

When('put same bucket again', function() {
  return bucket
    .put()
    .then(({ status }) => {
      this.putResponseStatus = status;
    })
    .catch(({ response }) => {
      this.putResponseStatus = response.status;
    });
});

Then('put same bucket again status code is {int}', function(int) {
  assert.equal(this.putResponseStatus, int);
});

When('list objects', function() {
  return bucket
    .listObjects()
    .then(({ status, data }) => {
      this.listObjectsStatus = status;
      this.ObjectCount = data.keys.length;
    })
    .catch(({ response }) => {
      console.error('list bucket objects error', response.data);
      this.listObjectsStatus = response.status;
    });
});

Then('list objects status code is {int}', function(int) {
  assert.equal(this.listObjectsStatus, int);
});

Then('list objects keys count is {int}', function(int) {
  assert.equal(this.ObjectCount, int);
});

When('head bucket', function() {
  return bucket
    .head()
    .then(({ status }) => {
      this.headStatus = status;
    })
    .catch(({ response }) => {
      console.error('head bucket error', response.data);
      this.headStatus = response.status;
    });
});

Then('head bucket status code is {int}', function(int) {
  assert.equal(this.headStatus, int);
});

When('delete multiple objects:', function(docString) {
  const body = JSON.parse(docString);

  return Promise.all(
    body.objects.map(({ key }) => {
      return bucket.putObject(key);
    })
  )
    .then(() => {
      return bucket.deleteMultipleObjects(body);
    })
    .then(({ status }) => {
      this.deleteMultipleObjectsStatus = status;
    })
    .catch(({ response }) => {
      console.error('delete multiple objects error', response.data);
      this.deleteMultipleObjectsStatus = response.status;
    });
});

Then('delete multiple objects code is {int}', function(int) {
  assert.equal(this.deleteMultipleObjectsStatus, int);
});

When('get bucket statistics', function() {
  return bucket
    .getStatistics()
    .then(({ status, data }) => {
      this.getBucketstatsStatus = status;
      this.bucketStats = data.status;
    })
    .catch(({ response }) => {
      console.error('get bucket statistics error', response.data);
      this.getBucketstatsStatus = response.status;
    });
});

Then('get bucket statistics status code is {int}', function(int) {
  assert.equal(this.getBucketstatsStatus, int);
});

Then('get bucket statistics status is {string}', function(status) {
  assert.equal(this.bucketStats, status);
});

When('delete bucket', function() {
  return bucket
    .delete()
    .then(({ status }) => {
      this.deleteBucketStatus = status;
    })
    .catch(({ response }) => {
      console.error('delete bucket error', response.data);
      this.deleteBucketStatus = response.status;
    });
});

Then('delete bucket status code is {int}', function(int) {
  assert.equal(this.deleteBucketStatus, int);
});

Given('an object created by initiate multipart upload', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('list multipart uploads', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('list multipart uploads count is {int}', function(int) {
  // Then('list multipart uploads count is {float}', function (float) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('list multipart uploads with prefix', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('list multipart uploads with prefix count is {int}', function(int) {
  // Then('list multipart uploads with prefix count is {float}', function (float) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
