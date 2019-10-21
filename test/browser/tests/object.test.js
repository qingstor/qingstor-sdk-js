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

'use strict';

describe('QingStor test', function() {
  let Config = qingstor_sdk.Config;
  let QingStor = qingstor_sdk.QingStor;
  let test_config = new Config().loadConfig(qingstor_config);
  let test = new QingStor(test_config).Bucket(qingstor_test_config['bucket'], qingstor_test_config['zone']);
  it('GetObjectQuery test', function() {
    let expires = Math.floor(Date.now(), 1000) + 1000;
    let testUri = test.getObjectRequest('test_key').signQuery(expires).operation.uri;
    console.log(testUri);
  });
  it('ListObjects test', () => {
    test.listObjects().then((res) => {
      console.log(res.keys);
    });
  });
  it('PutObject test', () => {
    test.putObject('test_key', {
      body: 'aaaaaaaaaaaaaaaaa'
    }).then((res) => {
      console.log(res.statusCode);
    });
  });
  it('DeleteMultipleObject test', () => {
    test.deleteMultipleObjects({
      objects: [{
        key: 'aaa'
      },
      {
        key: 'bbb'
      }
      ]
    }).then((res) => {
      console.log(res.statusCode);
    });
  });
  it('CompleteMultipart test', () => {
    test.completeMultipartUpload('test', {
      object_parts: [{
        part_number: '0'
      },
      {
        part_number: '1'
      },
      ],
      upload_id: 'xxx'
    }).then((res) => {
      console.log(res.statusCode);
    });
  });
});
