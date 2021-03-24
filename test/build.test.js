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

import process from 'process';
import Builder from '../src/build';
import Config from '../src/config';

const should = require('chai').should();

const packageVersion = require('../package.json').version;
const userAgent = [
  'qingstor-sdk-js/',
  packageVersion,
  ' (Node.js ',
  process.version,
  '; ',
  process.platform,
  ' ',
  process.arch,
  ') ',
  'UserExample',
].join('');

describe('Builder test', function () {
  const config = new Config();
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
  const test = new Builder(config, operation);

  it('parseRequestParams test', function () {
    test.parseRequestParams(operation).should.eql({
      upload_id: 'test_upload_id',
    });
  });

  it('parseRequestHeaders test', function () {
    test.parseRequestHeaders(operation).should.eql({
      host: 'qingstor.com',
      'x-qs-date': 'test time',
      'content-type': 'image/jpeg',
      'user-agent': userAgent,
    });
  });

  it('parseRequestBody test', function () {
    test.parseRequestBody(operation).should.eql('test string');
  });

  it('parseRequestProperties test', function () {
    test.parseRequestProperties(operation).should.eql({
      zone: 'pek3a',
      'bucket-name': 'test_bucket',
      'object-key': 'test_object.jpg',
    });
  });

  it('parseRequestUri test', function () {
    test.parseRequestURI(operation).should.eql({
      endpoint: 'https://pek3a.qingstor.com',
      path: '/test_bucket/test_object.jpg?acl',
      uri: 'https://pek3a.qingstor.com/test_bucket/test_object.jpg?acl&upload_id=test_upload_id',
    });
  });

  it('parseVirtualHostRequestUri test', function() {
    process.env.QINGSTOR_ENABLE_VIRTUAL_HOST_STYLE = true;
    const _config = new Config();
    const _test = new Builder(_config, operation);

    _test.parseRequestURI(operation).should.eql({
      endpoint: 'https://test_bucket.pek3a.qingstor.com',
      path: '/test_object.jpg?acl',
      uri: 'https://test_bucket.pek3a.qingstor.com/test_object.jpg?acl&upload_id=test_upload_id',
    });
  });

  it('parse test', function () {
    test.parse().should.eql({
      method: 'PUT',
      endpoint: 'https://pek3a.qingstor.com',
      path: '/test_bucket/test_object.jpg?acl',
      uri: 'https://pek3a.qingstor.com/test_bucket/test_object.jpg?acl&upload_id=test_upload_id',
      body: 'test string',
      params: {
        upload_id: 'test_upload_id',
      },
      headers: {
        host: 'qingstor.com',
        'x-qs-date': 'test time',
        'content-type': 'image/jpeg',
        'user-agent': userAgent,
      },
    });
  });
});
