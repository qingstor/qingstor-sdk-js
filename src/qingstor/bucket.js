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
import SDKError from '../error';

/**
 * Bucket Module
 * @param {Object} config object
 * @param {Object} properties
 */
class Bucket {
  constructor(config, properties) {
    // Zone should be forced to lower case
    if (properties && properties['zone']) {
      properties['zone'] = properties['zone'].toLowerCase();
    }

    this.config = config;
    this.properties = properties;
  }

  /**
   * Delete a bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/delete.html)
   *
   * @return {Promise} axios response
   */
  delete() {
    return this.deleteRequest().send();
  }

  /**
   * @ignore
   * Build Delete's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/delete.html)
   *
   * @return Signer
   */
  deleteRequest() {
    const operation = {
      api: 'DeleteBucket',
      method: 'DELETE',
      uri: '/<bucket-name>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deleteValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteValidate(operation) {}

  /**
   * Delete CORS information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/delete_cors.html)
   *
   * @return {Promise} axios response
   */
  deleteCORS() {
    return this.deleteCORSRequest().send();
  }

  /**
   * @ignore
   * Build DeleteCORS's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/delete_cors.html)
   *
   * @return Signer
   */
  deleteCORSRequest() {
    const operation = {
      api: 'DeleteBucketCORS',
      method: 'DELETE',
      uri: '/<bucket-name>?cors',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deleteCORSValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteCORSValidate(operation) {}

  /**
   * Delete external mirror of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/delete_external_mirror.html)
   *
   * @return {Promise} axios response
   */
  deleteExternalMirror() {
    return this.deleteExternalMirrorRequest().send();
  }

  /**
   * @ignore
   * Build DeleteExternalMirror's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/delete_external_mirror.html)
   *
   * @return Signer
   */
  deleteExternalMirrorRequest() {
    const operation = {
      api: 'DeleteBucketExternalMirror',
      method: 'DELETE',
      uri: '/<bucket-name>?mirror',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deleteExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteExternalMirrorValidate(operation) {}

  /**
   * Delete Lifecycle information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/delete_lifecycle.html)
   *
   * @return {Promise} axios response
   */
  deleteLifecycle() {
    return this.deleteLifecycleRequest().send();
  }

  /**
   * @ignore
   * Build DeleteLifecycle's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/delete_lifecycle.html)
   *
   * @return Signer
   */
  deleteLifecycleRequest() {
    const operation = {
      api: 'DeleteBucketLifecycle',
      method: 'DELETE',
      uri: '/<bucket-name>?lifecycle',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deleteLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteLifecycleValidate(operation) {}

  /**
   * Delete Notification information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/delete_notification.html)
   *
   * @return {Promise} axios response
   */
  deleteNotification() {
    return this.deleteNotificationRequest().send();
  }

  /**
   * @ignore
   * Build DeleteNotification's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/delete_notification.html)
   *
   * @return Signer
   */
  deleteNotificationRequest() {
    const operation = {
      api: 'DeleteBucketNotification',
      method: 'DELETE',
      uri: '/<bucket-name>?notification',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deleteNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteNotificationValidate(operation) {}

  /**
   * Delete policy information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/policy/delete_policy.html)
   *
   * @return {Promise} axios response
   */
  deletePolicy() {
    return this.deletePolicyRequest().send();
  }

  /**
   * @ignore
   * Build DeletePolicy's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/policy/delete_policy.html)
   *
   * @return Signer
   */
  deletePolicyRequest() {
    const operation = {
      api: 'DeleteBucketPolicy',
      method: 'DELETE',
      uri: '/<bucket-name>?policy',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.deletePolicyValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deletePolicyValidate(operation) {}

  /**
   * Delete multiple objects from the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/delete_multiple.html)
   * @param {Object} options - User input options;
   * @param options.Content-MD5 - Object MD5sum
   * @param options.objects - A list of keys to delete
   * @param options.quiet - Whether to return the list of deleted objects
   *
   * @return {Promise} axios response
   */
  deleteMultipleObjects(options) {
    options = options || {};
    return this.deleteMultipleObjectsRequest(options).send();
  }

  /**
   * @ignore
   * Build DeleteMultipleObjects's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/delete_multiple.html)
   * @param {Object} options - User input options;
   * @param options.Content-MD5 - Object MD5sum
   * @param options.objects - A list of keys to delete
   * @param options.quiet - Whether to return the list of deleted objects
   *
   * @return Signer
   */
  deleteMultipleObjectsRequest(options = {}) {
    const operation = {
      api: 'DeleteMultipleObjects',
      method: 'POST',
      uri: '/<bucket-name>?delete',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
      },
      elements: {
        objects: options['objects'] || undefined,
        quiet: options['quiet'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.deleteMultipleObjectsValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteMultipleObjectsValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['objects'] === undefined ||
      operation['elements']['objects'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('objects', 'DeleteMultipleObjectsInput');
    }
    operation['elements']['objects'].forEach(function(value) {});
  }

  /**
   * Get ACL information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get_acl.html)
   *
   * @return {Promise} axios response
   */
  getACL() {
    return this.getACLRequest().send();
  }

  /**
   * @ignore
   * Build GetACL's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get_acl.html)
   *
   * @return Signer
   */
  getACLRequest() {
    const operation = {
      api: 'GetBucketACL',
      method: 'GET',
      uri: '/<bucket-name>?acl',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getACLValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getACLValidate(operation) {}

  /**
   * Get CORS information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/get_cors.html)
   *
   * @return {Promise} axios response
   */
  getCORS() {
    return this.getCORSRequest().send();
  }

  /**
   * @ignore
   * Build GetCORS's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/get_cors.html)
   *
   * @return Signer
   */
  getCORSRequest() {
    const operation = {
      api: 'GetBucketCORS',
      method: 'GET',
      uri: '/<bucket-name>?cors',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getCORSValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getCORSValidate(operation) {}

  /**
   * Get external mirror of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/get_external_mirror.html)
   *
   * @return {Promise} axios response
   */
  getExternalMirror() {
    return this.getExternalMirrorRequest().send();
  }

  /**
   * @ignore
   * Build GetExternalMirror's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/get_external_mirror.html)
   *
   * @return Signer
   */
  getExternalMirrorRequest() {
    const operation = {
      api: 'GetBucketExternalMirror',
      method: 'GET',
      uri: '/<bucket-name>?mirror',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getExternalMirrorValidate(operation) {}

  /**
   * Get Lifecycle information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/get_lifecycle.html)
   *
   * @return {Promise} axios response
   */
  getLifecycle() {
    return this.getLifecycleRequest().send();
  }

  /**
   * @ignore
   * Build GetLifecycle's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/get_lifecycle.html)
   *
   * @return Signer
   */
  getLifecycleRequest() {
    const operation = {
      api: 'GetBucketLifecycle',
      method: 'GET',
      uri: '/<bucket-name>?lifecycle',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getLifecycleValidate(operation) {}

  /**
   * Get Notification information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/get_notification.html)
   *
   * @return {Promise} axios response
   */
  getNotification() {
    return this.getNotificationRequest().send();
  }

  /**
   * @ignore
   * Build GetNotification's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/get_notification.html)
   *
   * @return Signer
   */
  getNotificationRequest() {
    const operation = {
      api: 'GetBucketNotification',
      method: 'GET',
      uri: '/<bucket-name>?notification',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getNotificationValidate(operation) {}

  /**
   * Get policy information of the bucket. [Documentation URL](https://https://docs.qingcloud.com/qingstor/api/bucket/policy/get_policy.html)
   *
   * @return {Promise} axios response
   */
  getPolicy() {
    return this.getPolicyRequest().send();
  }

  /**
   * @ignore
   * Build GetPolicy's request
   * [Documentation URL](https://https://docs.qingcloud.com/qingstor/api/bucket/policy/get_policy.html)
   *
   * @return Signer
   */
  getPolicyRequest() {
    const operation = {
      api: 'GetBucketPolicy',
      method: 'GET',
      uri: '/<bucket-name>?policy',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getPolicyValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getPolicyValidate(operation) {}

  /**
   * Get statistics information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get_stats.html)
   *
   * @return {Promise} axios response
   */
  getStatistics() {
    return this.getStatisticsRequest().send();
  }

  /**
   * @ignore
   * Build GetStatistics's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get_stats.html)
   *
   * @return Signer
   */
  getStatisticsRequest() {
    const operation = {
      api: 'GetBucketStatistics',
      method: 'GET',
      uri: '/<bucket-name>?stats',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.getStatisticsValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getStatisticsValidate(operation) {}

  /**
   * Check whether the bucket exists and available. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/head.html)
   *
   * @return {Promise} axios response
   */
  head() {
    return this.headRequest().send();
  }

  /**
   * @ignore
   * Build Head's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/head.html)
   *
   * @return Signer
   */
  headRequest() {
    const operation = {
      api: 'HeadBucket',
      method: 'HEAD',
      uri: '/<bucket-name>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.headValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  headValidate(operation) {}

  /**
   * List multipart uploads in the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/list_multipart_uploads.html)
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.key_marker - Limit results returned from the first key after key_marker sorted by alphabetical order
   * @param options.limit - Results count limit
   * @param options.prefix - Limits results to keys that begin with the prefix
   * @param options.upload_id_marker - Limit results returned from the first uploading segment after upload_id_marker sorted by the time of upload_id
   *
   * @return {Promise} axios response
   */
  listMultipartUploads(options) {
    options = options || {};
    return this.listMultipartUploadsRequest(options).send();
  }

  /**
   * @ignore
   * Build ListMultipartUploads's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/list_multipart_uploads.html)
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.key_marker - Limit results returned from the first key after key_marker sorted by alphabetical order
   * @param options.limit - Results count limit
   * @param options.prefix - Limits results to keys that begin with the prefix
   * @param options.upload_id_marker - Limit results returned from the first uploading segment after upload_id_marker sorted by the time of upload_id
   *
   * @return Signer
   */
  listMultipartUploadsRequest(options = {}) {
    const operation = {
      api: 'ListMultipartUploads',
      method: 'GET',
      uri: '/<bucket-name>?uploads',
      params: {
        delimiter: options['delimiter'] || undefined,
        key_marker: options['key_marker'] || undefined,
        limit: options['limit'] || undefined,
        prefix: options['prefix'] || undefined,
        upload_id_marker: options['upload_id_marker'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.listMultipartUploadsValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  listMultipartUploadsValidate(operation) {}

  /**
   * Retrieve the object list in a bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get.html)
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   *
   * @return {Promise} axios response
   */
  listObjects(options) {
    options = options || {};
    return this.listObjectsRequest(options).send();
  }

  /**
   * @ignore
   * Build ListObjects's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/get.html)
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   *
   * @return Signer
   */
  listObjectsRequest(options = {}) {
    const operation = {
      api: 'ListObjects',
      method: 'GET',
      uri: '/<bucket-name>',
      params: {
        delimiter: options['delimiter'] || undefined,
        limit: options['limit'] || undefined,
        marker: options['marker'] || undefined,
        prefix: options['prefix'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.listObjectsValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  listObjectsValidate(operation) {}

  /**
   * Create a new bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/put.html)
   *
   * @return {Promise} axios response
   */
  put() {
    return this.putRequest().send();
  }

  /**
   * @ignore
   * Build Put's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/put.html)
   *
   * @return Signer
   */
  putRequest() {
    const operation = {
      api: 'PutBucket',
      method: 'PUT',
      uri: '/<bucket-name>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    this.putValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putValidate(operation) {}

  /**
   * Set ACL information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/put_acl.html)
   * @param {Object} options - User input options;
   * @param options.acl - Bucket ACL rules
   *
   * @return {Promise} axios response
   */
  putACL(options) {
    options = options || {};
    return this.putACLRequest(options).send();
  }

  /**
   * @ignore
   * Build PutACL's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/put_acl.html)
   * @param {Object} options - User input options;
   * @param options.acl - Bucket ACL rules
   *
   * @return Signer
   */
  putACLRequest(options = {}) {
    const operation = {
      api: 'PutBucketACL',
      method: 'PUT',
      uri: '/<bucket-name>?acl',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        acl: options['acl'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putACLValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putACLValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['acl'] === undefined ||
      operation['elements']['acl'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('acl', 'PutBucketACLInput');
    }
    operation['elements']['acl'].forEach(function(value) {
      if ('grantee' in value) {
        if (
          value['grantee'] === undefined ||
          value['grantee']['type'] === undefined ||
          value['grantee']['type'].toString() === ''
        ) {
          throw new SDKError.ParameterRequired('type', 'grantee');
        }
        if (
          value['grantee'] !== undefined &&
          value['grantee']['type'] !== undefined &&
          value['grantee']['type'].toString() !== ''
        ) {
          const type_valid_values = ['user', 'group'];
          if (type_valid_values.indexOf(value['grantee']['type']) === -1) {
            throw new SDKError.ParameterValueNotAllowed('type', value['grantee']['type'], type_valid_values);
          }
        }
      }
      if (value === undefined || value.toString() === '') {
        throw new SDKError.ParameterRequired('grantee', 'acl');
      }
      if (value === undefined || value['permission'] === undefined || value['permission'].toString() === '') {
        throw new SDKError.ParameterRequired('permission', 'acl');
      }
      if (value !== undefined && value['permission'] !== undefined && value['permission'].toString() !== '') {
        const permission_valid_values = ['READ', 'WRITE', 'FULL_CONTROL'];
        if (permission_valid_values.indexOf(value['permission']) === -1) {
          throw new SDKError.ParameterValueNotAllowed('permission', value['permission'], permission_valid_values);
        }
      }
    });
  }

  /**
   * Set CORS information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/put_cors.html)
   * @param {Object} options - User input options;
   * @param options.cors_rules - Bucket CORS rules
   *
   * @return {Promise} axios response
   */
  putCORS(options) {
    options = options || {};
    return this.putCORSRequest(options).send();
  }

  /**
   * @ignore
   * Build PutCORS's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/cors/put_cors.html)
   * @param {Object} options - User input options;
   * @param options.cors_rules - Bucket CORS rules
   *
   * @return Signer
   */
  putCORSRequest(options = {}) {
    const operation = {
      api: 'PutBucketCORS',
      method: 'PUT',
      uri: '/<bucket-name>?cors',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        cors_rules: options['cors_rules'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putCORSValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putCORSValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['cors_rules'] === undefined ||
      operation['elements']['cors_rules'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('cors_rules', 'PutBucketCORSInput');
    }
    operation['elements']['cors_rules'].forEach(function(value) {
      if (value === undefined || value['allowed_methods'] === undefined || value['allowed_methods'].toString() === '') {
        throw new SDKError.ParameterRequired('allowed_methods', 'cors_rule');
      }
      if (value === undefined || value['allowed_origin'] === undefined || value['allowed_origin'].toString() === '') {
        throw new SDKError.ParameterRequired('allowed_origin', 'cors_rule');
      }
    });
  }

  /**
   * Set external mirror of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/put_external_mirror.html)
   * @param {Object} options - User input options;
   * @param options.source_site - Source site url
   *
   * @return {Promise} axios response
   */
  putExternalMirror(options) {
    options = options || {};
    return this.putExternalMirrorRequest(options).send();
  }

  /**
   * @ignore
   * Build PutExternalMirror's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/put_external_mirror.html)
   * @param {Object} options - User input options;
   * @param options.source_site - Source site url
   *
   * @return Signer
   */
  putExternalMirrorRequest(options = {}) {
    const operation = {
      api: 'PutBucketExternalMirror',
      method: 'PUT',
      uri: '/<bucket-name>?mirror',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        source_site: options['source_site'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putExternalMirrorValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['source_site'] === undefined ||
      operation['elements']['source_site'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('source_site', 'PutBucketExternalMirrorInput');
    }
  }

  /**
   * Set Lifecycle information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/put_lifecycle.html)
   * @param {Object} options - User input options;
   * @param options.rule - Bucket Lifecycle rule
   *
   * @return {Promise} axios response
   */
  putLifecycle(options) {
    options = options || {};
    return this.putLifecycleRequest(options).send();
  }

  /**
   * @ignore
   * Build PutLifecycle's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/put_lifecycle.html)
   * @param {Object} options - User input options;
   * @param options.rule - Bucket Lifecycle rule
   *
   * @return Signer
   */
  putLifecycleRequest(options = {}) {
    const operation = {
      api: 'PutBucketLifecycle',
      method: 'PUT',
      uri: '/<bucket-name>?lifecycle',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        rule: options['rule'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putLifecycleValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['rule'] === undefined ||
      operation['elements']['rule'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('rule', 'PutBucketLifecycleInput');
    }
    operation['elements']['rule'].forEach(function(value) {
      if ('abort_incomplete_multipart_upload' in value) {
        if (
          value['abort_incomplete_multipart_upload'] === undefined ||
          value['abort_incomplete_multipart_upload']['days_after_initiation'] === undefined ||
          value['abort_incomplete_multipart_upload']['days_after_initiation'].toString() === ''
        ) {
          throw new SDKError.ParameterRequired('days_after_initiation', 'abort_incomplete_multipart_upload');
        }
      }
      if ('expiration' in value) {
      }
      if ('filter' in value) {
        if (
          value['filter'] === undefined ||
          value['filter']['prefix'] === undefined ||
          value['filter']['prefix'].toString() === ''
        ) {
          throw new SDKError.ParameterRequired('prefix', 'filter');
        }
      }
      if (value === undefined || value.toString() === '') {
        throw new SDKError.ParameterRequired('filter', 'rule');
      }
      if (value === undefined || value['id'] === undefined || value['id'].toString() === '') {
        throw new SDKError.ParameterRequired('id', 'rule');
      }
      if (value === undefined || value['status'] === undefined || value['status'].toString() === '') {
        throw new SDKError.ParameterRequired('status', 'rule');
      }
      if (value !== undefined && value['status'] !== undefined && value['status'].toString() !== '') {
        const status_valid_values = ['enabled', 'disabled'];
        if (status_valid_values.indexOf(value['status']) === -1) {
          throw new SDKError.ParameterValueNotAllowed('status', value['status'], status_valid_values);
        }
      }
      if ('transition' in value) {
        if (
          value['transition'] === undefined ||
          value['transition']['storage_class'] === undefined ||
          value['transition']['storage_class'].toString() === ''
        ) {
          throw new SDKError.ParameterRequired('storage_class', 'transition');
        }
      }
    });
  }

  /**
   * Set Notification information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/put_notification.html)
   * @param {Object} options - User input options;
   * @param options.notifications - Bucket Notification
   *
   * @return {Promise} axios response
   */
  putNotification(options) {
    options = options || {};
    return this.putNotificationRequest(options).send();
  }

  /**
   * @ignore
   * Build PutNotification's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/notification/put_notification.html)
   * @param {Object} options - User input options;
   * @param options.notifications - Bucket Notification
   *
   * @return Signer
   */
  putNotificationRequest(options = {}) {
    const operation = {
      api: 'PutBucketNotification',
      method: 'PUT',
      uri: '/<bucket-name>?notification',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        notifications: options['notifications'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putNotificationValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['notifications'] === undefined ||
      operation['elements']['notifications'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('notifications', 'PutBucketNotificationInput');
    }
    operation['elements']['notifications'].forEach(function(value) {
      if (value === undefined || value['cloudfunc'] === undefined || value['cloudfunc'].toString() === '') {
        throw new SDKError.ParameterRequired('cloudfunc', 'notification');
      }
      if (value !== undefined && value['cloudfunc'] !== undefined && value['cloudfunc'].toString() !== '') {
        const cloudfunc_valid_values = ['tupu-porn', 'notifier', 'image'];
        if (cloudfunc_valid_values.indexOf(value['cloudfunc']) === -1) {
          throw new SDKError.ParameterValueNotAllowed('cloudfunc', value['cloudfunc'], cloudfunc_valid_values);
        }
      }
      if ('cloudfunc_args' in value) {
        if (
          value['cloudfunc_args'] === undefined ||
          value['cloudfunc_args']['action'] === undefined ||
          value['cloudfunc_args']['action'].toString() === ''
        ) {
          throw new SDKError.ParameterRequired('action', 'cloudfunc_args');
        }
      }
      if (value === undefined || value['event_types'] === undefined || value['event_types'].toString() === '') {
        throw new SDKError.ParameterRequired('event_types', 'notification');
      }
      if (value === undefined || value['id'] === undefined || value['id'].toString() === '') {
        throw new SDKError.ParameterRequired('id', 'notification');
      }
    });
  }

  /**
   * Set policy information of the bucket. [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html)
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   *
   * @return {Promise} axios response
   */
  putPolicy(options) {
    options = options || {};
    return this.putPolicyRequest(options).send();
  }

  /**
   * @ignore
   * Build PutPolicy's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html)
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   *
   * @return Signer
   */
  putPolicyRequest(options = {}) {
    const operation = {
      api: 'PutBucketPolicy',
      method: 'PUT',
      uri: '/<bucket-name>?policy',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {
        statement: options['statement'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    this.putPolicyValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putPolicyValidate(operation) {
    if (
      operation['elements'] === undefined ||
      operation['elements']['statement'] === undefined ||
      operation['elements']['statement'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('statement', 'PutBucketPolicyInput');
    }
    operation['elements']['statement'].forEach(function(value) {
      if (value === undefined || value['action'] === undefined || value['action'].toString() === '') {
        throw new SDKError.ParameterRequired('action', 'statement');
      }
      if ('condition' in value) {
        if ('ip_address' in value['condition']) {
        }
        if ('is_null' in value['condition']) {
        }
        if ('not_ip_address' in value['condition']) {
        }
        if ('string_like' in value['condition']) {
        }
        if ('string_not_like' in value['condition']) {
        }
      }
      if (value === undefined || value['effect'] === undefined || value['effect'].toString() === '') {
        throw new SDKError.ParameterRequired('effect', 'statement');
      }
      if (value !== undefined && value['effect'] !== undefined && value['effect'].toString() !== '') {
        const effect_valid_values = ['allow', 'deny'];
        if (effect_valid_values.indexOf(value['effect']) === -1) {
          throw new SDKError.ParameterValueNotAllowed('effect', value['effect'], effect_valid_values);
        }
      }
      if (value === undefined || value['id'] === undefined || value['id'].toString() === '') {
        throw new SDKError.ParameterRequired('id', 'statement');
      }
      if (value === undefined || value['user'] === undefined || value['user'].toString() === '') {
        throw new SDKError.ParameterRequired('user', 'statement');
      }
    });
  }

  /**
   * Abort multipart upload. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/abort_multipart_upload.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.upload_id - Object multipart upload ID
   *
   * @return {Promise} axios response
   */
  abortMultipartUpload(object_key, options) {
    options = options || {};
    return this.abortMultipartUploadRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build AbortMultipartUpload's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/abort_multipart_upload.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.upload_id - Object multipart upload ID
   *
   * @return Signer
   */
  abortMultipartUploadRequest(object_key, options = {}) {
    const operation = {
      api: 'AbortMultipartUpload',
      method: 'DELETE',
      uri: '/<bucket-name>/<object-key>',
      params: {
        upload_id: options['upload_id'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.abortMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  abortMultipartUploadValidate(operation) {
    if (
      operation['params'] === undefined ||
      operation['params']['upload_id'] === undefined ||
      operation['params']['upload_id'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('upload_id', 'AbortMultipartUploadInput');
    }
  }

  /**
   * Complete multipart upload. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/complete_multipart_upload.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.ETag - MD5sum of the object part
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.upload_id - Object multipart upload ID
   * @param options.object_parts - Object parts
   *
   * @return {Promise} axios response
   */
  completeMultipartUpload(object_key, options) {
    options = options || {};
    return this.completeMultipartUploadRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build CompleteMultipartUpload's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/complete_multipart_upload.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.ETag - MD5sum of the object part
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.upload_id - Object multipart upload ID
   * @param options.object_parts - Object parts
   *
   * @return Signer
   */
  completeMultipartUploadRequest(object_key, options = {}) {
    const operation = {
      api: 'CompleteMultipartUpload',
      method: 'POST',
      uri: '/<bucket-name>/<object-key>',
      params: {
        upload_id: options['upload_id'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        etag: options['etag'] || options['ETag'] || undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      elements: {
        object_parts: options['object_parts'] || undefined,
      },
      properties: this.properties,
      body: options['body'] || undefined,
    };
    operation.properties['object-key'] = object_key;
    this.completeMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  completeMultipartUploadValidate(operation) {
    if (
      operation['params'] === undefined ||
      operation['params']['upload_id'] === undefined ||
      operation['params']['upload_id'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('upload_id', 'CompleteMultipartUploadInput');
    }
    if (
      operation['elements'] === undefined ||
      operation['elements']['object_parts'] === undefined ||
      operation['elements']['object_parts'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('object_parts', 'CompleteMultipartUploadInput');
    }
    operation['elements']['object_parts'].forEach(function(value) {
      if (value === undefined || value['part_number'] === undefined || value['part_number'].toString() === '') {
        throw new SDKError.ParameterRequired('part_number', 'object_part');
      }
    });
  }

  /**
   * Delete the object. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/delete.html)
   * @param {string} object_key The object key
   *
   * @return {Promise} axios response
   */
  deleteObject(object_key) {
    return this.deleteObjectRequest(object_key).send();
  }

  /**
   * @ignore
   * Build DeleteObject's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/delete.html)
   * @param object_key The object key
   *
   * @return Signer
   */
  deleteObjectRequest(object_key) {
    const operation = {
      api: 'DeleteObject',
      method: 'DELETE',
      uri: '/<bucket-name>/<object-key>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.deleteObjectValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  deleteObjectValidate(operation) {}

  /**
   * Retrieve the object. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/get.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.Range - Specified range of the object
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   *
   * @return {Promise} axios response
   */
  getObject(object_key, options) {
    options = options || {};
    return this.getObjectRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build GetObject's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/get.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.Range - Specified range of the object
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   *
   * @return Signer
   */
  getObjectRequest(object_key, options = {}) {
    const operation = {
      api: 'GetObject',
      method: 'GET',
      uri: '/<bucket-name>/<object-key>',
      params: {
        'response-cache-control': options['response-cache-control'] || undefined,
        'response-content-disposition': options['response-content-disposition'] || undefined,
        'response-content-encoding': options['response-content-encoding'] || undefined,
        'response-content-language': options['response-content-language'] || undefined,
        'response-content-type': options['response-content-type'] || undefined,
        'response-expires': options['response-expires'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'if-match': options['if-match'] || options['If-Match'] || undefined,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
        'if-none-match': options['if-none-match'] || options['If-None-Match'] || undefined,
        'if-unmodified-since': options['if-unmodified-since'] || options['If-Unmodified-Since'] || undefined,
        range: options['range'] || options['Range'] || undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.getObjectValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  getObjectValidate(operation) {}

  /**
   * Check whether the object exists and available. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/head.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   *
   * @return {Promise} axios response
   */
  headObject(object_key, options) {
    options = options || {};
    return this.headObjectRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build HeadObject's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/head.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   *
   * @return Signer
   */
  headObjectRequest(object_key, options = {}) {
    const operation = {
      api: 'HeadObject',
      method: 'HEAD',
      uri: '/<bucket-name>/<object-key>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'if-match': options['if-match'] || options['If-Match'] || undefined,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
        'if-none-match': options['if-none-match'] || options['If-None-Match'] || undefined,
        'if-unmodified-since': options['if-unmodified-since'] || options['If-Unmodified-Since'] || undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.headObjectValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  headObjectValidate(operation) {}

  /**
   * Image process with the action on the object [Documentation URL](https://docs.qingcloud.com/qingstor/data_process/image_process/index.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.action - Image process action
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   *
   * @return {Promise} axios response
   */
  imageProcess(object_key, options) {
    options = options || {};
    return this.imageProcessRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build ImageProcess's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/data_process/image_process/index.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.action - Image process action
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   *
   * @return Signer
   */
  imageProcessRequest(object_key, options = {}) {
    const operation = {
      api: 'ImageProcess',
      method: 'GET',
      uri: '/<bucket-name>/<object-key>?image',
      params: {
        action: options['action'] || undefined,
        'response-cache-control': options['response-cache-control'] || undefined,
        'response-content-disposition': options['response-content-disposition'] || undefined,
        'response-content-encoding': options['response-content-encoding'] || undefined,
        'response-content-language': options['response-content-language'] || undefined,
        'response-content-type': options['response-content-type'] || undefined,
        'response-expires': options['response-expires'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.imageProcessValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  imageProcessValidate(operation) {
    if (
      operation['params'] === undefined ||
      operation['params']['action'] === undefined ||
      operation['params']['action'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('action', 'ImageProcessInput');
    }
  }

  /**
   * Initial multipart upload on the object. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/initiate_multipart_upload.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return {Promise} axios response
   */
  initiateMultipartUpload(object_key, options) {
    options = options || {};
    return this.initiateMultipartUploadRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build InitiateMultipartUpload's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/initiate_multipart_upload.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return Signer
   */
  initiateMultipartUploadRequest(object_key, options = {}) {
    const operation = {
      api: 'InitiateMultipartUpload',
      method: 'POST',
      uri: '/<bucket-name>/<object-key>?uploads',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'content-type': options['content-type'] || options['Content-Type'] || undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-metadata': options['x-qs-metadata'] || options['X-QS-MetaData'] || undefined,
        'x-qs-storage-class': options['x-qs-storage-class'] || options['X-QS-Storage-Class'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.initiateMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  initiateMultipartUploadValidate(operation) {
    if (
      operation['headers'] !== undefined &&
      operation['headers']['X-QS-Storage-Class'] !== undefined &&
      operation['headers']['X-QS-Storage-Class'].toString() !== ''
    ) {
      const x_qs_storage_class_valid_values = ['STANDARD', 'STANDARD_IA'];
      if (x_qs_storage_class_valid_values.indexOf(operation['headers']['X-QS-Storage-Class']) === -1) {
        throw new SDKError.ParameterValueNotAllowed(
          'X-QS-Storage-Class',
          operation['headers']['X-QS-Storage-Class'],
          x_qs_storage_class_valid_values
        );
      }
    }
  }

  /**
   * List object parts. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/list_multipart.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.limit - Limit results count
   * @param options.part_number_marker - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return {Promise} axios response
   */
  listMultipart(object_key, options) {
    options = options || {};
    return this.listMultipartRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build ListMultipart's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/list_multipart.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.limit - Limit results count
   * @param options.part_number_marker - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return Signer
   */
  listMultipartRequest(object_key, options = {}) {
    const operation = {
      api: 'ListMultipart',
      method: 'GET',
      uri: '/<bucket-name>/<object-key>',
      params: {
        limit: options['limit'] || undefined,
        part_number_marker: options['part_number_marker'] || undefined,
        upload_id: options['upload_id'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.listMultipartValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  listMultipartValidate(operation) {
    if (
      operation['params'] === undefined ||
      operation['params']['upload_id'] === undefined ||
      operation['params']['upload_id'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('upload_id', 'ListMultipartInput');
    }
  }

  /**
   * Check whether the object accepts a origin with method and header. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/options.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Access-Control-Request-Headers - Request headers
   * @param options.Access-Control-Request-Method - Request method
   * @param options.Origin - Request origin
   *
   * @return {Promise} axios response
   */
  optionsObject(object_key, options) {
    options = options || {};
    return this.optionsObjectRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build OptionsObject's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/options.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.Access-Control-Request-Headers - Request headers
   * @param options.Access-Control-Request-Method - Request method
   * @param options.Origin - Request origin
   *
   * @return Signer
   */
  optionsObjectRequest(object_key, options = {}) {
    const operation = {
      api: 'OptionsObject',
      method: 'OPTIONS',
      uri: '/<bucket-name>/<object-key>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'access-control-request-headers':
          options['access-control-request-headers'] || options['Access-Control-Request-Headers'] || undefined,
        'access-control-request-method':
          options['access-control-request-method'] || options['Access-Control-Request-Method'] || undefined,
        origin: options['origin'] || options['Origin'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: undefined,
    };
    operation.properties['object-key'] = object_key;
    this.optionsObjectValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  optionsObjectValidate(operation) {
    if (
      operation['headers'] === undefined ||
      operation['headers']['Access-Control-Request-Method'] === undefined ||
      operation['headers']['Access-Control-Request-Method'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('Access-Control-Request-Method', 'OptionsObjectInput');
    }
    if (
      operation['headers'] === undefined ||
      operation['headers']['Origin'] === undefined ||
      operation['headers']['Origin'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('Origin', 'OptionsObjectInput');
    }
  }

  /**
   * Upload the object. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/put.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Cache-Control - Object cache control
   * @param options.Content-Encoding - Object content encoding
   * @param options.Content-Length - Object content size
   * @param options.Content-MD5 - Object MD5sum
   * @param options.Content-Type - Object content type
   * @param options.Expect - Used to indicate that particular server behaviors are required by the client
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the copy source matches
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the copy source does not match
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Fetch-If-Unmodified-Since - Check whether fetch target object has not been modified
   * @param options.X-QS-Fetch-Source - Fetch source, should be a valid url
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return {Promise} axios response
   */
  putObject(object_key, options) {
    options = options || {};
    return this.putObjectRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build PutObject's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/put.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.Cache-Control - Object cache control
   * @param options.Content-Encoding - Object content encoding
   * @param options.Content-Length - Object content size
   * @param options.Content-MD5 - Object MD5sum
   * @param options.Content-Type - Object content type
   * @param options.Expect - Used to indicate that particular server behaviors are required by the client
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the copy source matches
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the copy source does not match
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Fetch-If-Unmodified-Since - Check whether fetch target object has not been modified
   * @param options.X-QS-Fetch-Source - Fetch source, should be a valid url
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return Signer
   */
  putObjectRequest(object_key, options = {}) {
    const operation = {
      api: 'PutObject',
      method: 'PUT',
      uri: '/<bucket-name>/<object-key>',
      params: {},
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'cache-control': options['cache-control'] || options['Cache-Control'] || undefined,
        'content-encoding': options['content-encoding'] || options['Content-Encoding'] || undefined,
        'content-length': options['content-length'] || options['Content-Length'] || undefined,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
        'content-type': options['content-type'] || options['Content-Type'] || undefined,
        expect: options['expect'] || options['Expect'] || undefined,
        'x-qs-copy-source': options['x-qs-copy-source'] || options['X-QS-Copy-Source'] || undefined,
        'x-qs-copy-source-encryption-customer-algorithm':
          options['x-qs-copy-source-encryption-customer-algorithm'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Algorithm'] ||
          undefined,
        'x-qs-copy-source-encryption-customer-key':
          options['x-qs-copy-source-encryption-customer-key'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Key'] ||
          undefined,
        'x-qs-copy-source-encryption-customer-key-md5':
          options['x-qs-copy-source-encryption-customer-key-md5'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Key-MD5'] ||
          undefined,
        'x-qs-copy-source-if-match':
          options['x-qs-copy-source-if-match'] || options['X-QS-Copy-Source-If-Match'] || undefined,
        'x-qs-copy-source-if-modified-since':
          options['x-qs-copy-source-if-modified-since'] || options['X-QS-Copy-Source-If-Modified-Since'] || undefined,
        'x-qs-copy-source-if-none-match':
          options['x-qs-copy-source-if-none-match'] || options['X-QS-Copy-Source-If-None-Match'] || undefined,
        'x-qs-copy-source-if-unmodified-since':
          options['x-qs-copy-source-if-unmodified-since'] ||
          options['X-QS-Copy-Source-If-Unmodified-Since'] ||
          undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-fetch-if-unmodified-since':
          options['x-qs-fetch-if-unmodified-since'] || options['X-QS-Fetch-If-Unmodified-Since'] || undefined,
        'x-qs-fetch-source': options['x-qs-fetch-source'] || options['X-QS-Fetch-Source'] || undefined,
        'x-qs-metadata': options['x-qs-metadata'] || options['X-QS-MetaData'] || undefined,
        'x-qs-move-source': options['x-qs-move-source'] || options['X-QS-Move-Source'] || undefined,
        'x-qs-storage-class': options['x-qs-storage-class'] || options['X-QS-Storage-Class'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: options['body'] || undefined,
    };
    operation.properties['object-key'] = object_key;
    this.putObjectValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  putObjectValidate(operation) {
    if (
      operation['headers'] !== undefined &&
      operation['headers']['X-QS-Storage-Class'] !== undefined &&
      operation['headers']['X-QS-Storage-Class'].toString() !== ''
    ) {
      const x_qs_storage_class_valid_values = ['STANDARD', 'STANDARD_IA'];
      if (x_qs_storage_class_valid_values.indexOf(operation['headers']['X-QS-Storage-Class']) === -1) {
        throw new SDKError.ParameterValueNotAllowed(
          'X-QS-Storage-Class',
          operation['headers']['X-QS-Storage-Class'],
          x_qs_storage_class_valid_values
        );
      }
    }
  }

  /**
   * Upload object multipart. [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/multipart/upload_multipart.html)
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Length - Object multipart content length
   * @param options.Content-MD5 - Object multipart content MD5sum
   * @param options.X-QS-Copy-Range - Specify range of the source object
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the Etag of copy source matches the specified value
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified since the specified date
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the Etag of copy source does not matches the specified value
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been unmodified since the specified date
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return {Promise} axios response
   */
  uploadMultipart(object_key, options) {
    options = options || {};
    return this.uploadMultipartRequest(object_key, options).send();
  }

  /**
   * @ignore
   * Build UploadMultipart's request
   * [Documentation URL](https://docs.qingcloud.com/qingstor/api/object/multipart/upload_multipart.html)
   * @param object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Length - Object multipart content length
   * @param options.Content-MD5 - Object multipart content MD5sum
   * @param options.X-QS-Copy-Range - Specify range of the source object
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the Etag of copy source matches the specified value
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified since the specified date
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the Etag of copy source does not matches the specified value
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been unmodified since the specified date
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return Signer
   */
  uploadMultipartRequest(object_key, options = {}) {
    const operation = {
      api: 'UploadMultipart',
      method: 'PUT',
      uri: '/<bucket-name>/<object-key>',
      params: {
        part_number: options['part_number'] || undefined,
        upload_id: options['upload_id'] || undefined,
      },
      headers: {
        host: this.properties.zone + '.' + this.config.host,
        'content-length': options['content-length'] || options['Content-Length'] || undefined,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
        'x-qs-copy-range': options['x-qs-copy-range'] || options['X-QS-Copy-Range'] || undefined,
        'x-qs-copy-source': options['x-qs-copy-source'] || options['X-QS-Copy-Source'] || undefined,
        'x-qs-copy-source-encryption-customer-algorithm':
          options['x-qs-copy-source-encryption-customer-algorithm'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Algorithm'] ||
          undefined,
        'x-qs-copy-source-encryption-customer-key':
          options['x-qs-copy-source-encryption-customer-key'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Key'] ||
          undefined,
        'x-qs-copy-source-encryption-customer-key-md5':
          options['x-qs-copy-source-encryption-customer-key-md5'] ||
          options['X-QS-Copy-Source-Encryption-Customer-Key-MD5'] ||
          undefined,
        'x-qs-copy-source-if-match':
          options['x-qs-copy-source-if-match'] || options['X-QS-Copy-Source-If-Match'] || undefined,
        'x-qs-copy-source-if-modified-since':
          options['x-qs-copy-source-if-modified-since'] || options['X-QS-Copy-Source-If-Modified-Since'] || undefined,
        'x-qs-copy-source-if-none-match':
          options['x-qs-copy-source-if-none-match'] || options['X-QS-Copy-Source-If-None-Match'] || undefined,
        'x-qs-copy-source-if-unmodified-since':
          options['x-qs-copy-source-if-unmodified-since'] ||
          options['X-QS-Copy-Source-If-Unmodified-Since'] ||
          undefined,
        'x-qs-encryption-customer-algorithm':
          options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key':
          options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5':
          options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      elements: {},
      properties: this.properties,
      body: options['body'] || undefined,
    };
    operation.properties['object-key'] = object_key;
    this.uploadMultipartValidate(operation);
    return new Request(this.config, operation).build();
  }

  /**
   * @ignore
   */
  // eslint-disable-next-line no-unused-vars
  uploadMultipartValidate(operation) {
    if (
      operation['params'] === undefined ||
      operation['params']['part_number'] === undefined ||
      operation['params']['part_number'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('part_number', 'UploadMultipartInput');
    }
    if (
      operation['params'] === undefined ||
      operation['params']['upload_id'] === undefined ||
      operation['params']['upload_id'].toString() === ''
    ) {
      throw new SDKError.ParameterRequired('upload_id', 'UploadMultipartInput');
    }
  }
}

export default Bucket;
