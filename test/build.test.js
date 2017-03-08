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

import url from 'url';
import { expect } from 'chai';
import process from 'process';
import Builder from '../src/build';
import Config from '../src/config';


let pjson = require('../package.json');
let should = require('chai').should();

describe('Builder test', function() {
  let config = new Config('test_access_key', 'test_secret_key');
  let operation = {
    "method": "PUT",
    "uri": "/<bucket-name>/<object-key>?acl",
    "headers": {
      "Host": 'qingstor.com',
      'X-QS-Date': 'test time',
      'empty-header': ''
    },
    "params": {
      "upload_id": 'test_upload_id',
      'empty-param': ''
    },
    "properties": {
      "zone": 'pek3a',
      "bucket-name": 'test_bucket',
      "object-key": 'test_object.jpg',
      "empty-property": ''
    },
    'body': 'test string'
  };
  let test = new Builder(config, operation);

  it('parseRequestParams test', function() {
    test.parseRequestParams(operation).should.eql(
      {
        "upload_id": 'test_upload_id'
      }
    );
  });

  it('parseRequestHeaders test', function() {
    test.parseRequestHeaders(operation).should.eql(
      {
        "Host": 'qingstor.com',
        'X-QS-Date': 'test time',
        'Content-Type': 'image/jpeg',
        'User-Agent': 'qingstor-sdk-js/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')',
        'Content-Length': 11
      }
    );
  });

  it('parseRequestBody test', function() {
    test.parseRequestBody(operation).should.eql(
      'test string'
    );
  });

  it('parseRequestProperties test', function() {
    test.parseRequestProperties(operation).should.eql(
      {
        "zone": 'pek3a',
        "bucket-name": 'test_bucket',
        "object-key": 'test_object.jpg'
      }
    );
  });

  it('parseRequestUri test', function() {
    url.format(test.parseRequestUri(operation)).should.eql(
      'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id'
    );
  });

  it('parse test', function() {
    test.parse().should.eql({
      'method': 'PUT',
      'uri': 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id',
      'body': 'test string',
      'headers': {
        'Host': 'qingstor.com',
        'X-QS-Date': 'test time',
        'Content-Length': 11,
        "Content-Type": "image/jpeg",
        'User-Agent': 'qingstor-sdk-js/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')'
      }
    })
  });

});
