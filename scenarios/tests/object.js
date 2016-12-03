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

"use strict";

var child_process = require("child_process");
var Config = require("qingstor-sdk").Config;
var Qingstor = require('qingstor-sdk').QingStor;
var yaml = require('js-yaml');
var fs = require('fs');
var should = require('chai').should();
var request = require('request');

module.exports = function () {
    var config = new Config().loadUserConfig();
    var test_config = yaml.safeLoad(fs.readFileSync("test_config.yaml"));
    var test = new Qingstor(config);
    var test_bucket = test.Bucket(test_config['bucket_name'], test_config['zone']);
    test_bucket.put();

    var test_res = undefined;
    var test_data = undefined;

    this.When(/^put object with key "([^"]*)"$/, function (arg1, callback) {
        child_process.exec('dd if=/dev/zero of=/tmp/sdk_bin bs=1048576 count=1', function (error, stdout, stderr) {
            if (error) {
                console.error('exec error: ' + error);
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            test_bucket.putObject(arg1, {
                'body': fs.readFileSync("/tmp/sdk_bin")
            }, function (err, res, data) {
                test_res = res;
                child_process.exec('rm -f /tmp/sdk_bin');
                callback();
            });
        });
    });
    this.Then(/^put object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^copy object with key "([^"]*)"$/, function (arg1, callback) {
        test_bucket.putObject(arg1, {
            'x_qs_copy_source': '/' + test_config['bucket_name'] + '/' + 'test_object'
        }, function (err, res, data) {
            test_res = res;
            callback();
        });
    });
    this.Then(/^copy object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^move object with key "([^"]*)"$/, function (arg1, callback) {
        test_bucket.putObject(arg1, {
            'x_qs_move_source': '/' + test_config['bucket_name'] + '/' + 'test_copy_object'
        }, function (err, res, data) {
            test_res = res;
            callback();
        });
    });
    this.Then(/^move object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^get object$/, function (callback) {
        test_bucket.getObject('test_object', {}, function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        });
    });
    this.Then(/^get object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });
    this.Then(/^get object content length is (\d+)$/, function (arg1, callback) {
        callback(null, test_data.length.toString().should.eql(arg1));
    });

    this.When(/^get object with query signature$/, function (callback) {
        var expires = Math.floor(Date.now(), 1000) + 1000;
        request(test_bucket.getObjectQuery('test_object', expires), function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        })
    });
    this.Then(/^get object with query signature content length is (\d+)$/, function (arg1, callback) {
        callback(null, test_data.length.toString().should.eql(arg1));
    });

    this.When(/^head object$/, function (callback) {
        test_bucket.headObject('test_object', {}, function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        });
    });
    this.Then(/^head object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^options object with method "([^"]*)" and origin "([^"]*)"$/, function (arg1, arg2, callback) {
        test_bucket.optionsObject('test_object', {
            'Access-Control-Request-Method': arg1,
            'Origin': arg2
        }, function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        });
    });
    this.Then(/^options object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^delete object$/, function (callback) {
        test_bucket.deleteObject('test_object', function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        });
    });
    this.Then(/^delete object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    this.When(/^delete the move object$/, function (callback) {
        test_bucket.deleteObject('test_move_object', function (err, res, data) {
            test_res = res;
            test_data = data;
            callback();
        });
    });
    this.Then(/^delete the move object status code is (\d+)$/, function (arg1, callback) {
        callback(null, test_res.statusCode.toString().should.eql(arg1));
    });

    test_bucket.delete();
};
