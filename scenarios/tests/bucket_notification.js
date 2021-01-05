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
import { When, Then } from 'cucumber';

import Config from '../../src/config';
import QingStor from '../../src/qingstor/qingstor';

const { bucket_name: bucketName, zone } = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './test_config.yaml')));
const config = new Config().loadConfigFromFilepath(path.join(__dirname, './config.yaml'));
const qingstor = new QingStor(config);
const bucket = qingstor.Bucket(bucketName, zone);

bucket.put();

When('put bucket notification:', function (string) {
  return bucket
    .putNotification(JSON.parse(string))
    .then(({ status }) => {
      this.putResponseStatus = status;
    })
    .catch(({ response }) => {
      console.error('put bucket notification error', response.data);
      this.putResponseStatus = response.status;
    });
});

Then('put bucket notification status code is {int}', function (int) {
  assert.equal(this.putResponseStatus, int);
});

When('get bucket notification', function () {
  return bucket.getNotification().then(({ status, data }) => {
    this.getResponseStatus = status;
    this.bucketNotification = data;
  });
});

Then('get bucket notification status code is {int}', function (int) {
  assert.equal(this.getResponseStatus, int);
});

Then('get bucket notification notify url should have {string}', function (string) {
  const isInclude = this.bucketNotification.notifications.some((item) => {
    return item.notify_url === string;
  });
  assert(isInclude);
});

When('delete bucket notification', function () {
  return bucket
    .deleteNotification()
    .then(({ status }) => {
      this.deleteResponseStatus = status;
    })
    .catch(({ response }) => {
      console.error('put bucket notification error', response.data);
      this.deleteResponseStatus = response.status;
    });
});

Then('delete bucket notification status code is {int}', function (int) {
  assert.equal(this.deleteResponseStatus, int);
});
