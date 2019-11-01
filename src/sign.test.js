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
import util from 'util';
import Signer from './sign';
const packageVersion = require('../package.json').version;

const userAgent = util.format(
  'qingstor-sdk-js/%s (Node.js %s; %s %s)',
  packageVersion,
  process.version,
  process.platform,
  process.arch
);

const operation = {
  endpoint: 'https://pek3a.qingstor.com:443',
  method: 'PUT',
  path: '/test_bucket/test_object.jpg?acl',
  params: {
    upload_id: 'test_upload_id',
  },
  uri: 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl&upload_id=test_upload_id',
  body: 'test string',
  headers: {
    host: 'qingstor.com',
    'x-qs-date': 'Fri, 01 Nov 2019 07:40:08 GMT',
    'content-length': 11,
    'content-type': 'image/jpeg',
    'x-qs-z': 'test-z',
    'x-qs-a': 'test-a',
    'x-qs-a-abc': 'test-abc',
    'user-agent': userAgent,
  },
};

const signer = new Signer('test_key', 'test_secret');

test('sign on header', () => {
  const signedOperation = signer.sign(operation);
  expect(signedOperation).toMatchSnapshot({
    headers: {
      'user-agent': expect.stringContaining('qingstor-sdk-js'),
    },
  });
});

test('sign on uri', () => {
  const signedOperation = signer.signQuery({
    expires: 1572592959,
    ...operation,
  });
  expect(signedOperation).toMatchSnapshot();
});

test('getSignature', () => {
  const signature = signer.getSignature(operation);
  expect(signature).toMatchSnapshot({
    signed_date: expect.any(String),
  });
});

test('getQuerySignature', () => {
  const signature = signer.getQuerySignature({
    ...operation,
    expiresTTL: 300,
  });
  expect(signature).toMatchSnapshot({
    expires: expect.any(Number),
    signature: expect.any(String),
    signed_date: expect.any(String),
  });
});

test('getCanonicalizedResource', () => {
  signer._setOperation(operation);
  expect(signer.getCanonicalizedResource()).toMatchSnapshot();
});

test('getAuthorization', () => {
  signer._setOperation(operation);
  expect(signer.getAuthorization()).toMatchSnapshot();
});
