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

var Builder = require('../lib/build');
var Config = require('../lib/config');
var should = require('chai').should();
var expect = require('chai').expect;
var pjson = require('../package.json');
var process = require('process');
var url = require('url');

describe('Builder test', function () {
    var config = new Config().loadUserConfig();
    var operation = {
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
    var test = new Builder(config, operation);
    it('parseRequestParams test', function () {
        test.parseRequestParams(operation).should.eql(
            {
                "upload_id": 'test_upload_id'
            }
        );
    });
    it('parseRequestHeaders test', function () {
        test.parseRequestHeaders(operation).should.eql(
            {
                "Host": 'qingstor.com',
                'X-QS-Date': 'test time',
                'Content-Type': 'image/jpeg',
                'User-Agent': 'QingStorSDK/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')',
                'Content-Length': 11
            }
        );
    });
    it('parseRequestBody test', function () {
        test.parseRequestBody(operation).should.eql(
            'test string'
        );
    });
    it('parseRequestProperties test', function () {
        test.parseRequestProperties(operation).should.eql(
            {
                "zone": 'pek3a',
                "bucket-name": 'test_bucket',
                "object-key": 'test_object.jpg'
            }
        );
    });
    it('parseRequestUri test', function () {
        url.format(test.parseRequestUri(operation)).should.eql(
            'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id'
        );
    });
    it('parse test', function () {
        test.parse().should.eql({
            'method': 'PUT',
            'uri': 'https://pek3a.qingstor.com:443/test_bucket/test_object.jpg?acl=&upload_id=test_upload_id',
            'body': 'test string',
            'headers': {
                'Host': 'qingstor.com',
                'X-QS-Date': 'test time',
                'Content-Length': 11,
                "Content-Type": "image/jpeg",
                'User-Agent': 'QingStorSDK/' + pjson.version + ' (Node.js ' + process.version + '; ' + process.platform + ')'
            }
        })
    })
});
