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

import util from 'util';

import Builder from './build';
import Config from './config';

const packageVersion = require('../package.json').version;
const userAgent = util.format(
  'qingstor-sdk-js/%s (Node.js %s; %s %s)',
  packageVersion,
  process.version,
  process.platform,
  process.arch
);

const config = new Config({
  access_key_id: 'test_access_key',
  secret_access_key: 'test_secret_key',
});
config.additional_user_agent = 'UserExample';

const operation = {
  method: 'PUT',
  uri: '/<bucket-name>/<object-key>?acl',
  headers: {
    host: 'qingstor.com',
    'x-qs-date': 'test time',
    'content-type': 'image/jpeg',
    'empty-header': '',
  },
  params: {
    upload_id: 'test_upload_id',
    'empty-param': '',
  },
  properties: {
    zone: 'pek3a',
    'bucket-name': 'test_bucket',
    'object-key': 'test_object.jpg',
    'empty-property': '',
  },
  body: 'test string',
};

const builder = new Builder(config, operation);

test('parse', () => {
  expect(builder.parse()).toMatchSnapshot();
});

test('parseRequestParams', () => {
  expect(builder.parseRequestParams(operation)).toMatchSnapshot();
});

test('parseRequestHeaders', () => {
  expect(builder.parseRequestHeaders(operation)).toMatchSnapshot();
});

test('parseRequestBody', () => {
  expect(builder.parseRequestBody(operation)).toMatchSnapshot();
});

test('parseRequestProperties', () => {
  expect(builder.parseRequestProperties(operation)).toMatchSnapshot();
});

test('parseRequestURI', () => {
  expect(builder.parseRequestURI(operation)).toMatchSnapshot();
});

test('parseVirtualHostRequestURI', () => {
  process.env.QINGSTOR_ENABLE_VIRTUAL_HOST_STYLE = true;

  const virtualHostBuilder = new Builder(new Config(), operation);

  expect(virtualHostBuilder.parseRequestURI(operation)).toMatchSnapshot();
});
