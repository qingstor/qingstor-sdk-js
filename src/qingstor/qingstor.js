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

/**
 * QingStor Module
 * @param {Object} config object
 */
class QingStor {
  constructor(config) {
    this.config = config;
  }

  /**
   * Retrieve the bucket list. [Documentation URL](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/service/get/)
   * @param {Object} options - User input options;
   * @param options.Location - Limits results to buckets that in the location
   * @param options.limit - Results count limit
   * @param options.offset - Limit results to keys that start at this offset
   *
   * @return {Promise} axios response
   */
  listBuckets(options) {
    options = options || {};
    return this.listBucketsRequest(options).send();
  }

  /**
   * @ignore
   * Build ListBuckets's request
   * [Documentation URL](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/service/get/)
   * @param {Object} options - User input options;
   * @param options.Location - Limits results to buckets that in the location
   * @param options.limit - Results count limit
   * @param options.offset - Limit results to keys that start at this offset
   *
   * @return Signer
   */
  listBucketsRequest(options = {}) {
    const operation = {
      api: 'ListBuckets',
      method: 'GET',
      uri: '/',
      params: {
        limit: options['limit'] || undefined,
        offset: options['offset'] || undefined,
      },
      headers: {
        host: this.config.host,
        location: options['location'] || options['Location'] || undefined,
      },
      elements: {},
      properties: {},
      body: undefined,
    };
    this.listBucketsValidate(operation);
    return new Request(this.config, operation).build();
  }

  // eslint-disable-next-line no-unused-vars
  listBucketsValidate(operation) {}

  Bucket(bucket_name, zone) {
    const properties = {
      'bucket-name': bucket_name,
      zone: zone,
    };
    return new Bucket(this.config, properties);
  }
}

export default QingStor;
