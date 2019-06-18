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

import Request from '../request';
import Bucket from './bucket';
import { isFunction } from '../utils';

class QingStor {

  constructor(config) {
    this.config = config;
  }


  /**
   * listBucketsRequest: Build ListBuckets's request
   * @link https://docs.qingcloud.com/qingstor/api/service/get.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Location - Limits results to buckets that in the location
   *
   * @return Signer
   */
  listBucketsRequest(options = {}) {
    let operation = {
      'api': 'ListBuckets',
      'method': 'GET',
      'uri': '/',
      'params': {
      },
      'headers': {
        'host': this.config.host,
        'location': options['location'] || options['Location'] || undefined,
      },
      'elements': {
      },
      'properties': {},
      'body': undefined
    };
    this.listBucketsValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * listBuckets: Retrieve the bucket list.
   * @link https://docs.qingcloud.com/qingstor/api/service/get.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Location - Limits results to buckets that in the location
   * @param callback Callback function
   *
   * @return none
   */
  listBuckets(options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    return this.listBucketsRequest(options).sign().send(callback);
  }


  listBucketsValidate(operation) {}


  Bucket(bucket_name, zone) {
    let properties = {
      'bucket-name': bucket_name,
      'zone': zone
    };
    return new Bucket(this.config, properties)
  }
}

export default QingStor;






