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
import Signer from '../src/sign';

const pjson = require('../package.json');
const should = require('chai').should();

describe('Signer test', function() {
  const operation = {
    method: 'PUT',
    path: '/test_bucket/test_object.jpg?acl',
    params: {
      upload_id: 'test_upload_id'
    },
    uri: 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl&upload_id=test_upload_id',
    body: 'test string',
    headers: {
      host: 'qingstor.com',
      'x-qs-date': 'test time',
      'content-length': 11,
      'content-type': 'image/jpeg',
      'x-qs-z': 'test-z',
      'x-qs-a': 'test-a',
      'x-qs-a-abc': 'test-abc',
      'user-agent': 'qingstor-sdk-js/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')'
    }
  };
  const test = new Signer(operation, 'test_key', 'test_secret');

  it('getCanonicalizedResource test', function() {
    test.getCanonicalizedResource().should.eql(
      '/test_bucket/test_object.jpg?acl&upload_id=test_upload_id'
    );
  });

  it('getAuthorization test', function() {
    test.getAuthorization().should.eql(
      '80srP9B+LVMlu9OktjkQh9w0m4eO+AYuOaiX2t3SYg4='
    );
  });

  it('sign test', function() {
    test.sign().should.eql({
      method: 'PUT',
      params: {
        upload_id: 'test_upload_id'
      },
      path: '/test_bucket/test_object.jpg?acl',
      uri: 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl&upload_id=test_upload_id',
      body: 'test string',
      headers: {
        host: 'qingstor.com',
        'x-qs-date': 'test time',
        'content-length': 11,
        'user-agent': 'qingstor-sdk-js/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')',
        'x-qs-z': 'test-z',
        'x-qs-a': 'test-a',
        'x-qs-a-abc': 'test-abc',
        authorization: 'QS test_key:80srP9B+LVMlu9OktjkQh9w0m4eO+AYuOaiX2t3SYg4=',
        'content-type': 'image/jpeg'
      }
    });
  });

});
