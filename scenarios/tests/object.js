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
import yaml from 'js-yaml';
import fetch from 'node-fetch';
import child_process from 'child_process';
import {
  Config,
  QingStor
} from '../../dist/node/qingstor-sdk';

let should = require('chai').should();

module.exports = function() {
  this.setDefaultTimeout(10 * 1000);

  let config = new Config().loadConfigFromFilepath('tests/config.yaml');
  let test_config = yaml.safeLoad(fs.readFileSync('tests/test_config.yaml'));
  let test = new QingStor(config);
  let test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
  test_bucket.put();

  let test_data = undefined;
  child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin bs=1024 count=1');

  this.When(/^put object with key "(.*)"$/, function(arg1, callback) {
    test_data = [];

    (async () => {
      test_data[0] = await test_bucket.putObject(arg1, {
        body: fs.readFileSync('/tmp/sdk_bin')
      });
      test_data[1] = await test_bucket.putObject(arg1 + 's', {
        body: fs.createReadStream('/tmp/sdk_bin')
      });
      test_data[2] = await test_bucket.putObject(arg1 + 'sp', {
        body: fs.createReadStream('/tmp/sdk_bin', {
          start: 0,
          end: 100
        })
      });
      callback();
    })();
  });
  this.Then(/^put object status code is (\d+)$/, function(arg1, callback) {
    for (let v of test_data) {
      if (!v.statusCode.toString().should.eql(arg1)) {
        callback(null, false);
      }
    }
    callback(null, true);
  });

  this.When(/^copy object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.putObject(arg1 + 'copy', {
      'X-QS-Copy-Source': '/' + test_config['bucket_name'] + '/' + arg1
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^copy object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });

  this.When(/^move object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.putObject(arg1 + 'move', {
      'X-QS-Move-Source': '/' + test_config['bucket_name'] + '/' + arg1 + 'copy'
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^move object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });

  this.When(/^get object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.getObject(arg1, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^get object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
  this.Then(/^get object content length is (\d+)$/, function(arg1, callback) {
    callback(null, (test_data.body.read().length * 1024).toString().should.eql(arg1));
  });

  this.When(/^get object "(.*)" with query signature$/, function(arg1, callback) {
    let expires = Math.floor(Date.now(), 1000) + 1000;
    fetch(test_bucket.getObjectRequest(arg1).signQuery(expires).operation.uri)
      .then(function(data) {
        test_data = data;
        callback();
      });
  });
  this.Then(/^get object with query signature content length is (\d+)$/, function(arg1, callback) {
    callback(null, (test_data.body.read().length * 1024).toString().should.eql(arg1));
  });

  this.When(/^get object "(.*)" with content type "(.*)"$/, function(arg1, arg2, callback) {
    test_bucket.getObject(arg1, {
      'response-content-type': arg2
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });

  this.Then(/^get object content type is "(.*)"$/, function(arg1, callback) {
    callback(null, test_data['content-type'].toString().should.eql(arg1));
  });

  this.When(/^head object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.headObject(arg1, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^head object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });

  this.When(/^options object "(.*)" with method "(.*)" and origin "(.*)"$/, function(arg1, arg2, arg3, callback) {
    test_bucket.optionsObject(arg1, {
      'Access-Control-Request-Method': arg2,
      Origin: arg3
    }, function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^options object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });

  this.When(/^delete object with key "(.*)"$/, function(arg1, callback) {
    test_data = [];

    (async () => {
      test_data[0] = await test_bucket.deleteObject(arg1);
      test_data[1] = await test_bucket.deleteObject(arg1 + 's');
      test_data[2] = await test_bucket.deleteObject(arg1 + 'sp');
      callback();
    })();
  });
  this.Then(/^delete object status code is (\d+)$/, function(arg1, callback) {
    for (let v of test_data) {
      if (!v.statusCode.toString().should.eql(arg1)) {
        callback(null, false);
      }
    }
    callback(null, true);
  });

  this.When(/^delete the move object with key "(.*)"$/, function(arg1, callback) {
    test_bucket.deleteObject(arg1 + 'move', function(err, data) {
      test_data = data;
      callback();
    });
  });
  this.Then(/^delete the move object status code is (\d+)$/, function(arg1, callback) {
    callback(null, test_data.statusCode.toString().should.eql(arg1));
  });
};
