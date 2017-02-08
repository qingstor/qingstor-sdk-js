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
var Bucket = require('./bucket');
var Signer = require('../sign');
var Builder = require('../build');
var Unpacker = require('../unpack');
var logger = require('loglevel');
var request = require('request');
var _ = require('lodash/core');


var QingStor = function(config) {
  this.config = config;
  if (_.isEmpty(config.access_key_id)) {
    throw new Error('access key not provided');
  }
  if (_.isEmpty(config.secret_access_key)) {
    throw new Error('secret access key not provided');
  }


  /**
   * listBucketsRequest: Build ListBuckets's request
   * @link https://docs.qingcloud.com/qingstor/api/service/get.html Documentation URL
   * @param options['Location'] Limits results to buckets that in the location
   *
   * @return Signer
   */
  this.listBucketsRequest = function(options) {
    var operation = {
      'api': 'ListBuckets',
      'method': 'GET',
      'uri': '/',
      'params': {
      },
      'headers': {
        'Host': config.host,
        'Location': _.result(options, 'Location', ''),
      },
      'elements': {
      },
      'properties': {},
      'body': undefined
    };
    this.listBucketsValidate(operation);
    return new Signer(
      new Builder(config, operation).parse(),
      config.access_key_id,
      config.secret_access_key
    );
  };



  /**
   * listBuckets: Retrieve the bucket list.
   * @link https://docs.qingcloud.com/qingstor/api/service/get.html Documentation URL
   * @param options['Location'] Limits results to buckets that in the location
   * @param callback Callback function
   *
   * @return none
   */
  this.listBuckets = function(options, callback) {
    var signer = this.listBucketsRequest(options);
    var retries = this.config.connection_retries;
    while (1) {
      try {
        logger.info('Sending QingStor request: listBuckets');
        request(signer.sign(), function(err, res) {
          callback && callback(err, Unpacker.unpack(res));
        });
      } catch (err) {
        logger.info(err);
        if (retries > 0) {
          retries -= 1;
        } else {
          throw new Error("Network Error");
        }
      }
      break;
    }
  };



  /**
   * listBucketsQuery: ListBuckets's Query Sign Way
   * @link https://docs.qingcloud.com/qingstor/api/service/get.html Documentation URL
   * @param options['Location'] Limits results to buckets that in the location
   * @param expires The time when this quert sign expires
   * @param callback Callback function
   *
   * @return none
   */
  this.listBucketsQuery = function(expires, options) {
    var signer = this.listBucketsRequest(options);
    return signer.query_sign(expires).uri;
  };


  this.listBucketsValidate = function(operation) {};


  this.Bucket = function(bucket_name, zone) {
    var properties = {
      'bucket-name': bucket_name,
      'zone': zone
    };
    return new Bucket(config, properties)
  };
};

module.exports = QingStor;








