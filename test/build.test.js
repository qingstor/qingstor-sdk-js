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

describe('Builder test', function () {
    var config = new Config().loadUserConfig();
    var operation = {
        "method": "GET",
        "uri": "/",
        "headers": {
            "Host": 'qingstor.com',
            'X-QS-Date': 'test time'
        },
        "params": {
            "upload-id": 'test_upload_id'
        },
        "properties": {
            "zone": 'pek3a'
        },
        'body': 'test string'
    };
    var test = new Builder(config, operation);
    it('parseRequestParams test', function () {
        test.parseRequestParams();
        test.parsedParams.should.eql(
            {
                "upload-id": 'test_upload_id'
            }
        );
    });
    it('parseRequestHeaders test', function () {
        test.parseRequestHeaders();
        test.parsedHeaders.should.eql(
            {
                "Host": 'qingstor.com',
                'X-QS-Date': 'test time'
            }
        );
    });
    it('parseRequestBody test', function () {
        test.parseRequestBody();
        test.parsedBody.should.eql(
            'test string'
        );
    });
    it('parseRequestProperties test', function () {
        test.parseRequestProperties();
        test.parsedProperties.should.eql(
            {
                "zone": 'pek3a'
            }
        );
    });
    it('parseRequestUri test', function () {
        test.parseRequestUri();
        test.parsedUri.should.eql(
            'https://pek3a.qingstor.com:443/?upload-id=test_upload_id'
        );
    });
    it('parse test', function () {
        test.parse().should.eql({
            'method': 'GET',
            'uri': 'https://pek3a.qingstor.com:443/?upload-id=test_upload_id',
            'body': 'test string',
            'headers': {
                'Host': 'qingstor.com',
                'X-QS-Date': 'test time',
                'Content-Length': 11,
            }
        })
    })
});
