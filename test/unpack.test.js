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

var Unpacker = require('../lib/unpack');
var should = require('chai').should();
var Config = require('../lib/config');
var QingStor = require('../lib/qingstor/qingstor');
var request = require('request');

describe('Unpacker test', function() {
  var config = new Config('test_access_key', 'test_secret_key');
  var qingstor = new QingStor(config);
  it('Unpacker test', function(done) {
    qingstor.listBuckets({}, function(err, data) {
      data.connection.should.equal('close');
      data.server.should.equal('QingStor');
      data.should.to.ownProperty('date');
      data['content-type'].should.equal('application/json');
      data['content-length'].should.equal('216');
      data.should.to.ownProperty('x-qs-request-id');

      data.message.should.equal('The access key id you provided does not exist.');
      data.code.should.equal('invalid_access_key_id');
      data.should.to.ownProperty('request_id');
      done();
    });
  });
});