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
import { isFunction } from '../utils';

class Bucket {

  constructor(config, properties) {
    // Zone should be forced to lower case
    if (properties && properties["zone"]) {
      properties["zone"] = properties["zone"].toLowerCase();
    }

    this.config = config;
    this.properties = properties;
  }


  /**
   * deleteRequest: Build Delete's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/delete.html Documentation URL
   *
   * @return Signer
   */
  deleteRequest() {
    let operation = {
      'api': 'DeleteBucket',
      'method': 'DELETE',
      'uri': '/<bucket-name>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deleteValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * delete: Delete a bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/delete.html Documentation URL
   *
   * @return none
   */
  delete() {
    return this.deleteRequest().sign().send();
  }


  deleteValidate(operation) {}



  /**
   * deleteCORSRequest: Build DeleteCORS's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/delete_cors.html Documentation URL
   *
   * @return Signer
   */
  deleteCORSRequest() {
    let operation = {
      'api': 'DeleteBucketCORS',
      'method': 'DELETE',
      'uri': '/<bucket-name>?cors',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deleteCORSValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteCORS: Delete CORS information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/delete_cors.html Documentation URL
   *
   * @return none
   */
  deleteCORS() {
    return this.deleteCORSRequest().sign().send();
  }


  deleteCORSValidate(operation) {}



  /**
   * deleteExternalMirrorRequest: Build DeleteExternalMirror's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/delete_external_mirror.html Documentation URL
   *
   * @return Signer
   */
  deleteExternalMirrorRequest() {
    let operation = {
      'api': 'DeleteBucketExternalMirror',
      'method': 'DELETE',
      'uri': '/<bucket-name>?mirror',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deleteExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteExternalMirror: Delete external mirror of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/delete_external_mirror.html Documentation URL
   *
   * @return none
   */
  deleteExternalMirror() {
    return this.deleteExternalMirrorRequest().sign().send();
  }


  deleteExternalMirrorValidate(operation) {}



  /**
   * deleteLifecycleRequest: Build DeleteLifecycle's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/delete_lifecycle.html Documentation URL
   *
   * @return Signer
   */
  deleteLifecycleRequest() {
    let operation = {
      'api': 'DeleteBucketLifecycle',
      'method': 'DELETE',
      'uri': '/<bucket-name>?lifecycle',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deleteLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteLifecycle: Delete Lifecycle information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/delete_lifecycle.html Documentation URL
   *
   * @return none
   */
  deleteLifecycle() {
    return this.deleteLifecycleRequest().sign().send();
  }


  deleteLifecycleValidate(operation) {}



  /**
   * deleteNotificationRequest: Build DeleteNotification's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/delete_notification.html Documentation URL
   *
   * @return Signer
   */
  deleteNotificationRequest() {
    let operation = {
      'api': 'DeleteBucketNotification',
      'method': 'DELETE',
      'uri': '/<bucket-name>?notification',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deleteNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteNotification: Delete Notification information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/delete_notification.html Documentation URL
   *
   * @return none
   */
  deleteNotification() {
    return this.deleteNotificationRequest().sign().send();
  }


  deleteNotificationValidate(operation) {}



  /**
   * deletePolicyRequest: Build DeletePolicy's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/delete_policy.html Documentation URL
   *
   * @return Signer
   */
  deletePolicyRequest() {
    let operation = {
      'api': 'DeleteBucketPolicy',
      'method': 'DELETE',
      'uri': '/<bucket-name>?policy',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.deletePolicyValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deletePolicy: Delete policy information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/delete_policy.html Documentation URL
   *
   * @return none
   */
  deletePolicy() {
    return this.deletePolicyRequest().sign().send();
  }


  deletePolicyValidate(operation) {}



  /**
   * deleteMultipleObjectsRequest: Build DeleteMultipleObjects's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/delete_multiple.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-MD5 - Object MD5sum
   * @param options.objects - A list of keys to delete
   * @param options.quiet - Whether to return the list of deleted objects
   *
   * @return Signer
   */
  deleteMultipleObjectsRequest(options = {}) {
    let operation = {
      'api': 'DeleteMultipleObjects',
      'method': 'POST',
      'uri': '/<bucket-name>?delete',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
      },
      'elements': {
        'objects': options['objects'] || undefined,
        'quiet': options['quiet'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.deleteMultipleObjectsValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteMultipleObjects: Delete multiple objects from the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/delete_multiple.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-MD5 - Object MD5sum
   * @param options.objects - A list of keys to delete
   * @param options.quiet - Whether to return the list of deleted objects
   *
   * @return none
   */
  deleteMultipleObjects(options) {
    options = options || {};
    return this.deleteMultipleObjectsRequest(options).sign().send();
  }


  deleteMultipleObjectsValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['objects'] === undefined || operation['elements']['objects'].toString() === '') {
      throw new SDKError.ParameterRequired('objects', 'DeleteMultipleObjectsInput');
    }
    operation['elements']['objects'].forEach(function(value) {});
  }



  /**
   * getACLRequest: Build GetACL's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get_acl.html Documentation URL
   *
   * @return Signer
   */
  getACLRequest() {
    let operation = {
      'api': 'GetBucketACL',
      'method': 'GET',
      'uri': '/<bucket-name>?acl',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getACLValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getACL: Get ACL information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get_acl.html Documentation URL
   *
   * @return none
   */
  getACL() {
    return this.getACLRequest().sign().send();
  }


  getACLValidate(operation) {}



  /**
   * getCORSRequest: Build GetCORS's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/get_cors.html Documentation URL
   *
   * @return Signer
   */
  getCORSRequest() {
    let operation = {
      'api': 'GetBucketCORS',
      'method': 'GET',
      'uri': '/<bucket-name>?cors',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getCORSValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getCORS: Get CORS information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/get_cors.html Documentation URL
   *
   * @return none
   */
  getCORS() {
    return this.getCORSRequest().sign().send();
  }


  getCORSValidate(operation) {}



  /**
   * getExternalMirrorRequest: Build GetExternalMirror's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/get_external_mirror.html Documentation URL
   *
   * @return Signer
   */
  getExternalMirrorRequest() {
    let operation = {
      'api': 'GetBucketExternalMirror',
      'method': 'GET',
      'uri': '/<bucket-name>?mirror',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getExternalMirror: Get external mirror of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/get_external_mirror.html Documentation URL
   *
   * @return none
   */
  getExternalMirror() {
    return this.getExternalMirrorRequest().sign().send();
  }


  getExternalMirrorValidate(operation) {}



  /**
   * getLifecycleRequest: Build GetLifecycle's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/get_lifecycle.html Documentation URL
   *
   * @return Signer
   */
  getLifecycleRequest() {
    let operation = {
      'api': 'GetBucketLifecycle',
      'method': 'GET',
      'uri': '/<bucket-name>?lifecycle',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getLifecycle: Get Lifecycle information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/get_lifecycle.html Documentation URL
   *
   * @return none
   */
  getLifecycle() {
    return this.getLifecycleRequest().sign().send();
  }


  getLifecycleValidate(operation) {}



  /**
   * getNotificationRequest: Build GetNotification's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/get_notification.html Documentation URL
   *
   * @return Signer
   */
  getNotificationRequest() {
    let operation = {
      'api': 'GetBucketNotification',
      'method': 'GET',
      'uri': '/<bucket-name>?notification',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getNotification: Get Notification information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/get_notification.html Documentation URL
   *
   * @return none
   */
  getNotification() {
    return this.getNotificationRequest().sign().send();
  }


  getNotificationValidate(operation) {}



  /**
   * getPolicyRequest: Build GetPolicy's request
   * @link https://https://docs.qingcloud.com/qingstor/api/bucket/policy/get_policy.html Documentation URL
   *
   * @return Signer
   */
  getPolicyRequest() {
    let operation = {
      'api': 'GetBucketPolicy',
      'method': 'GET',
      'uri': '/<bucket-name>?policy',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getPolicyValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getPolicy: Get policy information of the bucket.
   * @link https://https://docs.qingcloud.com/qingstor/api/bucket/policy/get_policy.html Documentation URL
   *
   * @return none
   */
  getPolicy() {
    return this.getPolicyRequest().sign().send();
  }


  getPolicyValidate(operation) {}



  /**
   * getStatisticsRequest: Build GetStatistics's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get_stats.html Documentation URL
   *
   * @return Signer
   */
  getStatisticsRequest() {
    let operation = {
      'api': 'GetBucketStatistics',
      'method': 'GET',
      'uri': '/<bucket-name>?stats',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.getStatisticsValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getStatistics: Get statistics information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get_stats.html Documentation URL
   *
   * @return none
   */
  getStatistics() {
    return this.getStatisticsRequest().sign().send();
  }


  getStatisticsValidate(operation) {}



  /**
   * headRequest: Build Head's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/head.html Documentation URL
   *
   * @return Signer
   */
  headRequest() {
    let operation = {
      'api': 'HeadBucket',
      'method': 'HEAD',
      'uri': '/<bucket-name>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.headValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * head: Check whether the bucket exists and available.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/head.html Documentation URL
   *
   * @return none
   */
  head() {
    return this.headRequest().sign().send();
  }


  headValidate(operation) {}



  /**
   * listMultipartUploadsRequest: Build ListMultipartUploads's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/list_multipart_uploads.html Documentation URL
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
    let operation = {
      'api': 'ListMultipartUploads',
      'method': 'GET',
      'uri': '/<bucket-name>?uploads',
      'params': {
        'delimiter': options['delimiter'] || undefined,
        'key_marker': options['key_marker'] || undefined,
        'limit': options['limit'] || undefined,
        'prefix': options['prefix'] || undefined,
        'upload_id_marker': options['upload_id_marker'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.listMultipartUploadsValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * listMultipartUploads: List multipart uploads in the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/list_multipart_uploads.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.key_marker - Limit results returned from the first key after key_marker sorted by alphabetical order
   * @param options.limit - Results count limit
   * @param options.prefix - Limits results to keys that begin with the prefix
   * @param options.upload_id_marker - Limit results returned from the first uploading segment after upload_id_marker sorted by the time of upload_id
   *
   * @return none
   */
  listMultipartUploads(options) {
    options = options || {};
    return this.listMultipartUploadsRequest(options).sign().send();
  }


  listMultipartUploadsValidate(operation) {}



  /**
   * listObjectsRequest: Build ListObjects's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   *
   * @return Signer
   */
  listObjectsRequest(options = {}) {
    let operation = {
      'api': 'ListObjects',
      'method': 'GET',
      'uri': '/<bucket-name>',
      'params': {
        'delimiter': options['delimiter'] || undefined,
        'limit': options['limit'] || undefined,
        'marker': options['marker'] || undefined,
        'prefix': options['prefix'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.listObjectsValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * listObjects: Retrieve the object list in a bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/get.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   *
   * @return none
   */
  listObjects(options) {
    options = options || {};
    return this.listObjectsRequest(options).sign().send();
  }


  listObjectsValidate(operation) {}



  /**
   * putRequest: Build Put's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/put.html Documentation URL
   *
   * @return Signer
   */
  putRequest() {
    let operation = {
      'api': 'PutBucket',
      'method': 'PUT',
      'uri': '/<bucket-name>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    this.putValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * put: Create a new bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/put.html Documentation URL
   *
   * @return none
   */
  put() {
    return this.putRequest().sign().send();
  }


  putValidate(operation) {}



  /**
   * putACLRequest: Build PutACL's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/put_acl.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.acl - Bucket ACL rules
   *
   * @return Signer
   */
  putACLRequest(options = {}) {
    let operation = {
      'api': 'PutBucketACL',
      'method': 'PUT',
      'uri': '/<bucket-name>?acl',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'acl': options['acl'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putACLValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putACL: Set ACL information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/put_acl.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.acl - Bucket ACL rules
   *
   * @return none
   */
  putACL(options) {
    options = options || {};
    return this.putACLRequest(options).sign().send();
  }


  putACLValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['acl'] === undefined || operation['elements']['acl'].toString() === '') {
      throw new SDKError.ParameterRequired('acl', 'PutBucketACLInput');
    }
    operation['elements']['acl'].forEach(function(value) {
      if (value.hasOwnProperty('grantee')) {
        if (value["grantee"] === undefined || value["grantee"]['type'] === undefined || value["grantee"]['type'].toString() === '') {
          throw new SDKError.ParameterRequired('type', 'grantee');
        }
        if (value["grantee"] !== undefined && value["grantee"]['type'] !== undefined && value["grantee"]['type'].toString() !== '') {
          let type_valid_values = ["user", "group"];
          if (type_valid_values.indexOf(value["grantee"]['type']) === -1) {
            throw new SDKError.ParameterValueNotAllowed(
              'type',
              value["grantee"]['type'],
              type_valid_values
            )
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
        let permission_valid_values = ["READ", "WRITE", "FULL_CONTROL"];
        if (permission_valid_values.indexOf(value['permission']) === -1) {
          throw new SDKError.ParameterValueNotAllowed(
            'permission',
            value['permission'],
            permission_valid_values
          )
        }
      }
    });
  }



  /**
   * putCORSRequest: Build PutCORS's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/put_cors.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.cors_rules - Bucket CORS rules
   *
   * @return Signer
   */
  putCORSRequest(options = {}) {
    let operation = {
      'api': 'PutBucketCORS',
      'method': 'PUT',
      'uri': '/<bucket-name>?cors',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'cors_rules': options['cors_rules'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putCORSValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putCORS: Set CORS information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/put_cors.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.cors_rules - Bucket CORS rules
   *
   * @return none
   */
  putCORS(options) {
    options = options || {};
    return this.putCORSRequest(options).sign().send();
  }


  putCORSValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['cors_rules'] === undefined || operation['elements']['cors_rules'].toString() === '') {
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
   * putExternalMirrorRequest: Build PutExternalMirror's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/put_external_mirror.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.source_site - Source site url
   *
   * @return Signer
   */
  putExternalMirrorRequest(options = {}) {
    let operation = {
      'api': 'PutBucketExternalMirror',
      'method': 'PUT',
      'uri': '/<bucket-name>?mirror',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'source_site': options['source_site'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putExternalMirror: Set external mirror of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/put_external_mirror.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.source_site - Source site url
   *
   * @return none
   */
  putExternalMirror(options) {
    options = options || {};
    return this.putExternalMirrorRequest(options).sign().send();
  }


  putExternalMirrorValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['source_site'] === undefined || operation['elements']['source_site'].toString() === '') {
      throw new SDKError.ParameterRequired('source_site', 'PutBucketExternalMirrorInput');
    }
  }



  /**
   * putLifecycleRequest: Build PutLifecycle's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/put_lifecycle.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.rule - Bucket Lifecycle rule
   *
   * @return Signer
   */
  putLifecycleRequest(options = {}) {
    let operation = {
      'api': 'PutBucketLifecycle',
      'method': 'PUT',
      'uri': '/<bucket-name>?lifecycle',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'rule': options['rule'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putLifecycleValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putLifecycle: Set Lifecycle information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/put_lifecycle.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.rule - Bucket Lifecycle rule
   *
   * @return none
   */
  putLifecycle(options) {
    options = options || {};
    return this.putLifecycleRequest(options).sign().send();
  }


  putLifecycleValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['rule'] === undefined || operation['elements']['rule'].toString() === '') {
      throw new SDKError.ParameterRequired('rule', 'PutBucketLifecycleInput');
    }
    operation['elements']['rule'].forEach(function(value) {
      if (value.hasOwnProperty('abort_incomplete_multipart_upload')) {
        if (value["abort_incomplete_multipart_upload"] === undefined || value["abort_incomplete_multipart_upload"]['days_after_initiation'] === undefined || value["abort_incomplete_multipart_upload"]['days_after_initiation'].toString() === '') {
          throw new SDKError.ParameterRequired('days_after_initiation', 'abort_incomplete_multipart_upload');
        }
      }
      if (value.hasOwnProperty('expiration')) {
      }
      if (value.hasOwnProperty('filter')) {
        if (value["filter"] === undefined || value["filter"]['prefix'] === undefined || value["filter"]['prefix'].toString() === '') {
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
        let status_valid_values = ["enabled", "disabled"];
        if (status_valid_values.indexOf(value['status']) === -1) {
          throw new SDKError.ParameterValueNotAllowed(
            'status',
            value['status'],
            status_valid_values
          )
        }
      }
      if (value.hasOwnProperty('transition')) {
        if (value["transition"] === undefined || value["transition"]['storage_class'] === undefined || value["transition"]['storage_class'].toString() === '') {
          throw new SDKError.ParameterRequired('storage_class', 'transition');
        }
      }
    });
  }



  /**
   * putNotificationRequest: Build PutNotification's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/put_notification.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.notifications - Bucket Notification
   *
   * @return Signer
   */
  putNotificationRequest(options = {}) {
    let operation = {
      'api': 'PutBucketNotification',
      'method': 'PUT',
      'uri': '/<bucket-name>?notification',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'notifications': options['notifications'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putNotificationValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putNotification: Set Notification information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/notification/put_notification.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.notifications - Bucket Notification
   *
   * @return none
   */
  putNotification(options) {
    options = options || {};
    return this.putNotificationRequest(options).sign().send();
  }


  putNotificationValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['notifications'] === undefined || operation['elements']['notifications'].toString() === '') {
      throw new SDKError.ParameterRequired('notifications', 'PutBucketNotificationInput');
    }
    operation['elements']['notifications'].forEach(function(value) {
      if (value === undefined || value['cloudfunc'] === undefined || value['cloudfunc'].toString() === '') {
        throw new SDKError.ParameterRequired('cloudfunc', 'notification');
      }
      if (value !== undefined && value['cloudfunc'] !== undefined && value['cloudfunc'].toString() !== '') {
        let cloudfunc_valid_values = ["tupu-porn", "notifier", "image"];
        if (cloudfunc_valid_values.indexOf(value['cloudfunc']) === -1) {
          throw new SDKError.ParameterValueNotAllowed(
            'cloudfunc',
            value['cloudfunc'],
            cloudfunc_valid_values
          )
        }
      }
      if (value.hasOwnProperty('cloudfunc_args')) {
        if (value["cloudfunc_args"] === undefined || value["cloudfunc_args"]['action'] === undefined || value["cloudfunc_args"]['action'].toString() === '') {
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
   * putPolicyRequest: Build PutPolicy's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   *
   * @return Signer
   */
  putPolicyRequest(options = {}) {
    let operation = {
      'api': 'PutBucketPolicy',
      'method': 'PUT',
      'uri': '/<bucket-name>?policy',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'statement': options['statement'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    this.putPolicyValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putPolicy: Set policy information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   *
   * @return none
   */
  putPolicy(options) {
    options = options || {};
    return this.putPolicyRequest(options).sign().send();
  }


  putPolicyValidate(operation) {
    if (operation['elements'] === undefined || operation['elements']['statement'] === undefined || operation['elements']['statement'].toString() === '') {
      throw new SDKError.ParameterRequired('statement', 'PutBucketPolicyInput');
    }
    operation['elements']['statement'].forEach(function(value) {
      if (value === undefined || value['action'] === undefined || value['action'].toString() === '') {
        throw new SDKError.ParameterRequired('action', 'statement');
      }
      if (value.hasOwnProperty('condition')) {
        if (value["condition"].hasOwnProperty('ip_address')) {
        }
        if (value["condition"].hasOwnProperty('is_null')) {
        }
        if (value["condition"].hasOwnProperty('not_ip_address')) {
        }
        if (value["condition"].hasOwnProperty('string_like')) {
        }
        if (value["condition"].hasOwnProperty('string_not_like')) {
        }
      }
      if (value === undefined || value['effect'] === undefined || value['effect'].toString() === '') {
        throw new SDKError.ParameterRequired('effect', 'statement');
      }
      if (value !== undefined && value['effect'] !== undefined && value['effect'].toString() !== '') {
        let effect_valid_values = ["allow", "deny"];
        if (effect_valid_values.indexOf(value['effect']) === -1) {
          throw new SDKError.ParameterValueNotAllowed(
            'effect',
            value['effect'],
            effect_valid_values
          )
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
   * abortMultipartUploadRequest: Build AbortMultipartUpload's request
   * @link https://docs.qingcloud.com/qingstor/api/object/abort_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   *
   * @return Signer
   */
  abortMultipartUploadRequest(object_key, options = {}) {
    let operation = {
      'api': 'AbortMultipartUpload',
      'method': 'DELETE',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'upload_id': options['upload_id'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.abortMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * abortMultipartUpload: Abort multipart upload.
   * @link https://docs.qingcloud.com/qingstor/api/object/abort_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   *
   * @return none
   */
  abortMultipartUpload(object_key, options) {
    options = options || {};
    return this.abortMultipartUploadRequest(object_key, options).sign().send();
  }


  abortMultipartUploadValidate(operation) {
    if (operation['params'] === undefined || operation['params']['upload_id'] === undefined || operation['params']['upload_id'].toString() === '') {
      throw new SDKError.ParameterRequired('upload_id', 'AbortMultipartUploadInput');
    }
  }



  /**
   * completeMultipartUploadRequest: Build CompleteMultipartUpload's request
   * @link https://docs.qingcloud.com/qingstor/api/object/complete_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.ETag - MD5sum of the object part
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.upload_id - Object multipart upload ID
   * @param options.object_parts - Object parts
   * @param object_key The object key
   *
   * @return Signer
   */
  completeMultipartUploadRequest(object_key, options = {}) {
    let operation = {
      'api': 'CompleteMultipartUpload',
      'method': 'POST',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'upload_id': options['upload_id'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'etag': options['etag'] || options['ETag'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      'elements': {
        'object_parts': options['object_parts'] || undefined,
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    operation.properties['object-key'] = object_key;
    this.completeMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * completeMultipartUpload: Complete multipart upload.
   * @link https://docs.qingcloud.com/qingstor/api/object/complete_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.ETag - MD5sum of the object part
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.upload_id - Object multipart upload ID
   * @param options.object_parts - Object parts
   * @param object_key The object key
   *
   * @return none
   */
  completeMultipartUpload(object_key, options) {
    options = options || {};
    return this.completeMultipartUploadRequest(object_key, options).sign().send();
  }


  completeMultipartUploadValidate(operation) {
    if (operation['params'] === undefined || operation['params']['upload_id'] === undefined || operation['params']['upload_id'].toString() === '') {
      throw new SDKError.ParameterRequired('upload_id', 'CompleteMultipartUploadInput');
    }
    if (operation['elements'] === undefined || operation['elements']['object_parts'] === undefined || operation['elements']['object_parts'].toString() === '') {
      throw new SDKError.ParameterRequired('object_parts', 'CompleteMultipartUploadInput');
    }
    operation['elements']['object_parts'].forEach(function(value) {
      if (value === undefined || value['part_number'] === undefined || value['part_number'].toString() === '') {
        throw new SDKError.ParameterRequired('part_number', 'object_part');
      }
    });
  }



  /**
   * deleteObjectRequest: Build DeleteObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/delete.html Documentation URL
   * @param object_key The object key
   *
   * @return Signer
   */
  deleteObjectRequest(object_key) {
    let operation = {
      'api': 'DeleteObject',
      'method': 'DELETE',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.deleteObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * deleteObject: Delete the object.
   * @link https://docs.qingcloud.com/qingstor/api/object/delete.html Documentation URL
   * @param object_key The object key
   *
   * @return none
   */
  deleteObject(object_key,) {
    return this.deleteObjectRequest(object_key).sign().send();
  }


  deleteObjectValidate(operation) {}



  /**
   * getObjectRequest: Build GetObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/get.html Documentation URL
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
   * @param object_key The object key
   *
   * @return Signer
   */
  getObjectRequest(object_key, options = {}) {
    let operation = {
      'api': 'GetObject',
      'method': 'GET',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'response-cache-control': options['response-cache-control'] || undefined,
        'response-content-disposition': options['response-content-disposition'] || undefined,
        'response-content-encoding': options['response-content-encoding'] || undefined,
        'response-content-language': options['response-content-language'] || undefined,
        'response-content-type': options['response-content-type'] || undefined,
        'response-expires': options['response-expires'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'if-match': options['if-match'] || options['If-Match'] || undefined,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
        'if-none-match': options['if-none-match'] || options['If-None-Match'] || undefined,
        'if-unmodified-since': options['if-unmodified-since'] || options['If-Unmodified-Since'] || undefined,
        'range': options['range'] || options['Range'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.getObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * getObject: Retrieve the object.
   * @link https://docs.qingcloud.com/qingstor/api/object/get.html Documentation URL
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
   * @param object_key The object key
   *
   * @return none
   */
  getObject(object_key, options) {
    options = options || {};
    return this.getObjectRequest(object_key, options).sign().send();
  }


  getObjectValidate(operation) {}



  /**
   * headObjectRequest: Build HeadObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/head.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param object_key The object key
   *
   * @return Signer
   */
  headObjectRequest(object_key, options = {}) {
    let operation = {
      'api': 'HeadObject',
      'method': 'HEAD',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'if-match': options['if-match'] || options['If-Match'] || undefined,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
        'if-none-match': options['if-none-match'] || options['If-None-Match'] || undefined,
        'if-unmodified-since': options['if-unmodified-since'] || options['If-Unmodified-Since'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.headObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * headObject: Check whether the object exists and available.
   * @link https://docs.qingcloud.com/qingstor/api/object/head.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.If-Match - Check whether the ETag matches
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.If-None-Match - Check whether the ETag does not match
   * @param options.If-Unmodified-Since - Check whether the object has not been modified
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param object_key The object key
   *
   * @return none
   */
  headObject(object_key, options) {
    options = options || {};
    return this.headObjectRequest(object_key, options).sign().send();
  }


  headObjectValidate(operation) {}



  /**
   * imageProcessRequest: Build ImageProcess's request
   * @link https://docs.qingcloud.com/qingstor/data_process/image_process/index.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.action - Image process action
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   * @param object_key The object key
   *
   * @return Signer
   */
  imageProcessRequest(object_key, options = {}) {
    let operation = {
      'api': 'ImageProcess',
      'method': 'GET',
      'uri': '/<bucket-name>/<object-key>?image',
      'params': {
        'action': options['action'] || undefined,
        'response-cache-control': options['response-cache-control'] || undefined,
        'response-content-disposition': options['response-content-disposition'] || undefined,
        'response-content-encoding': options['response-content-encoding'] || undefined,
        'response-content-language': options['response-content-language'] || undefined,
        'response-content-type': options['response-content-type'] || undefined,
        'response-expires': options['response-expires'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'if-modified-since': options['if-modified-since'] || options['If-Modified-Since'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.imageProcessValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * imageProcess: Image process with the action on the object
   * @link https://docs.qingcloud.com/qingstor/data_process/image_process/index.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.If-Modified-Since - Check whether the object has been modified
   * @param options.action - Image process action
   * @param options.response-cache-control - Specified the Cache-Control response header
   * @param options.response-content-disposition - Specified the Content-Disposition response header
   * @param options.response-content-encoding - Specified the Content-Encoding response header
   * @param options.response-content-language - Specified the Content-Language response header
   * @param options.response-content-type - Specified the Content-Type response header
   * @param options.response-expires - Specified the Expires response header
   * @param object_key The object key
   *
   * @return none
   */
  imageProcess(object_key, options) {
    options = options || {};
    return this.imageProcessRequest(object_key, options).sign().send();
  }


  imageProcessValidate(operation) {
    if (operation['params'] === undefined || operation['params']['action'] === undefined || operation['params']['action'].toString() === '') {
      throw new SDKError.ParameterRequired('action', 'ImageProcessInput');
    }
  }



  /**
   * initiateMultipartUploadRequest: Build InitiateMultipartUpload's request
   * @link https://docs.qingcloud.com/qingstor/api/object/initiate_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   * @param object_key The object key
   *
   * @return Signer
   */
  initiateMultipartUploadRequest(object_key, options = {}) {
    let operation = {
      'api': 'InitiateMultipartUpload',
      'method': 'POST',
      'uri': '/<bucket-name>/<object-key>?uploads',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'content-type': options['content-type'] || options['Content-Type'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-storage-class': options['x-qs-storage-class'] || options['X-QS-Storage-Class'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.initiateMultipartUploadValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * initiateMultipartUpload: Initial multipart upload on the object.
   * @link https://docs.qingcloud.com/qingstor/api/object/initiate_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   * @param object_key The object key
   *
   * @return none
   */
  initiateMultipartUpload(object_key, options) {
    options = options || {};
    return this.initiateMultipartUploadRequest(object_key, options).sign().send();
  }


  initiateMultipartUploadValidate(operation) {
    if (operation['headers'] !== undefined && operation['headers']['X-QS-Storage-Class'] !== undefined && operation['headers']['X-QS-Storage-Class'].toString() !== '') {
      let x_qs_storage_class_valid_values = ["STANDARD", "STANDARD_IA"];
      if (x_qs_storage_class_valid_values.indexOf(operation['headers']['X-QS-Storage-Class']) === -1) {
        throw new SDKError.ParameterValueNotAllowed(
          'X-QS-Storage-Class',
          operation['headers']['X-QS-Storage-Class'],
          x_qs_storage_class_valid_values
        )
      }
    }
  }



  /**
   * listMultipartRequest: Build ListMultipart's request
   * @link https://docs.qingcloud.com/qingstor/api/object/list_multipart.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.limit - Limit results count
   * @param options.part_number_marker - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   *
   * @return Signer
   */
  listMultipartRequest(object_key, options = {}) {
    let operation = {
      'api': 'ListMultipart',
      'method': 'GET',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'limit': options['limit'] || undefined,
        'part_number_marker': options['part_number_marker'] || undefined,
        'upload_id': options['upload_id'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.listMultipartValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * listMultipart: List object parts.
   * @link https://docs.qingcloud.com/qingstor/api/object/list_multipart.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.limit - Limit results count
   * @param options.part_number_marker - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   *
   * @return none
   */
  listMultipart(object_key, options) {
    options = options || {};
    return this.listMultipartRequest(object_key, options).sign().send();
  }


  listMultipartValidate(operation) {
    if (operation['params'] === undefined || operation['params']['upload_id'] === undefined || operation['params']['upload_id'].toString() === '') {
      throw new SDKError.ParameterRequired('upload_id', 'ListMultipartInput');
    }
  }



  /**
   * optionsObjectRequest: Build OptionsObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/options.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Access-Control-Request-Headers - Request headers
   * @param options.Access-Control-Request-Method - Request method
   * @param options.Origin - Request origin
   * @param object_key The object key
   *
   * @return Signer
   */
  optionsObjectRequest(object_key, options = {}) {
    let operation = {
      'api': 'OptionsObject',
      'method': 'OPTIONS',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'access-control-request-headers': options['access-control-request-headers'] || options['Access-Control-Request-Headers'] || undefined,
        'access-control-request-method': options['access-control-request-method'] || options['Access-Control-Request-Method'] || undefined,
        'origin': options['origin'] || options['Origin'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': undefined
    };
    operation.properties['object-key'] = object_key;
    this.optionsObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * optionsObject: Check whether the object accepts a origin with method and header.
   * @link https://docs.qingcloud.com/qingstor/api/object/options.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Access-Control-Request-Headers - Request headers
   * @param options.Access-Control-Request-Method - Request method
   * @param options.Origin - Request origin
   * @param object_key The object key
   *
   * @return none
   */
  optionsObject(object_key, options) {
    options = options || {};
    return this.optionsObjectRequest(object_key, options).sign().send();
  }


  optionsObjectValidate(operation) {
    if (operation['headers'] === undefined || operation['headers']['Access-Control-Request-Method'] === undefined || operation['headers']['Access-Control-Request-Method'].toString() === '') {
      throw new SDKError.ParameterRequired('Access-Control-Request-Method', 'OptionsObjectInput');
    }
    if (operation['headers'] === undefined || operation['headers']['Origin'] === undefined || operation['headers']['Origin'].toString() === '') {
      throw new SDKError.ParameterRequired('Origin', 'OptionsObjectInput');
    }
  }



  /**
   * putObjectRequest: Build PutObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/put.html Documentation URL
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
   * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   * @param object_key The object key
   *
   * @return Signer
   */
  putObjectRequest(object_key, options = {}) {
    let operation = {
      'api': 'PutObject',
      'method': 'PUT',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'cache-control': options['cache-control'] || options['Cache-Control'] || undefined,
        'content-encoding': options['content-encoding'] || options['Content-Encoding'] || undefined,
        'content-length': options['content-length'] || options['Content-Length'] || undefined,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
        'content-type': options['content-type'] || options['Content-Type'] || undefined,
        'expect': options['expect'] || options['Expect'] || undefined,
        'x-qs-copy-source': options['x-qs-copy-source'] || options['X-QS-Copy-Source'] || undefined,
        'x-qs-copy-source-encryption-customer-algorithm': options['x-qs-copy-source-encryption-customer-algorithm'] || options['X-QS-Copy-Source-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-copy-source-encryption-customer-key': options['x-qs-copy-source-encryption-customer-key'] || options['X-QS-Copy-Source-Encryption-Customer-Key'] || undefined,
        'x-qs-copy-source-encryption-customer-key-md5': options['x-qs-copy-source-encryption-customer-key-md5'] || options['X-QS-Copy-Source-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-copy-source-if-match': options['x-qs-copy-source-if-match'] || options['X-QS-Copy-Source-If-Match'] || undefined,
        'x-qs-copy-source-if-modified-since': options['x-qs-copy-source-if-modified-since'] || options['X-QS-Copy-Source-If-Modified-Since'] || undefined,
        'x-qs-copy-source-if-none-match': options['x-qs-copy-source-if-none-match'] || options['X-QS-Copy-Source-If-None-Match'] || undefined,
        'x-qs-copy-source-if-unmodified-since': options['x-qs-copy-source-if-unmodified-since'] || options['X-QS-Copy-Source-If-Unmodified-Since'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-fetch-if-unmodified-since': options['x-qs-fetch-if-unmodified-since'] || options['X-QS-Fetch-If-Unmodified-Since'] || undefined,
        'x-qs-fetch-source': options['x-qs-fetch-source'] || options['X-QS-Fetch-Source'] || undefined,
        'x-qs-move-source': options['x-qs-move-source'] || options['X-QS-Move-Source'] || undefined,
        'x-qs-storage-class': options['x-qs-storage-class'] || options['X-QS-Storage-Class'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    operation.properties['object-key'] = object_key;
    this.putObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putObject: Upload the object.
   * @link https://docs.qingcloud.com/qingstor/api/object/put.html Documentation URL
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
   * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   * @param object_key The object key
   *
   * @return none
   */
  putObject(object_key, options) {
    options = options || {};
    return this.putObjectRequest(object_key, options).sign().send();
  }


  putObjectValidate(operation) {
    if (operation['headers'] !== undefined && operation['headers']['X-QS-Storage-Class'] !== undefined && operation['headers']['X-QS-Storage-Class'].toString() !== '') {
      let x_qs_storage_class_valid_values = ["STANDARD", "STANDARD_IA"];
      if (x_qs_storage_class_valid_values.indexOf(operation['headers']['X-QS-Storage-Class']) === -1) {
        throw new SDKError.ParameterValueNotAllowed(
          'X-QS-Storage-Class',
          operation['headers']['X-QS-Storage-Class'],
          x_qs_storage_class_valid_values
        )
      }
    }
  }



  /**
   * uploadMultipartRequest: Build UploadMultipart's request
   * @link https://docs.qingcloud.com/qingstor/api/object/multipart/upload_multipart.html Documentation URL
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
   * @param object_key The object key
   *
   * @return Signer
   */
  uploadMultipartRequest(object_key, options = {}) {
    let operation = {
      'api': 'UploadMultipart',
      'method': 'PUT',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'part_number': options['part_number'] || undefined,
        'upload_id': options['upload_id'] || undefined,
      },
      'headers': {
        'host': this.properties.zone + '.' + this.config.host,
        'content-length': options['content-length'] || options['Content-Length'] || undefined,
        'content-md5': options['content-md5'] || options['Content-MD5'] || undefined,
        'x-qs-copy-range': options['x-qs-copy-range'] || options['X-QS-Copy-Range'] || undefined,
        'x-qs-copy-source': options['x-qs-copy-source'] || options['X-QS-Copy-Source'] || undefined,
        'x-qs-copy-source-encryption-customer-algorithm': options['x-qs-copy-source-encryption-customer-algorithm'] || options['X-QS-Copy-Source-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-copy-source-encryption-customer-key': options['x-qs-copy-source-encryption-customer-key'] || options['X-QS-Copy-Source-Encryption-Customer-Key'] || undefined,
        'x-qs-copy-source-encryption-customer-key-md5': options['x-qs-copy-source-encryption-customer-key-md5'] || options['X-QS-Copy-Source-Encryption-Customer-Key-MD5'] || undefined,
        'x-qs-copy-source-if-match': options['x-qs-copy-source-if-match'] || options['X-QS-Copy-Source-If-Match'] || undefined,
        'x-qs-copy-source-if-modified-since': options['x-qs-copy-source-if-modified-since'] || options['X-QS-Copy-Source-If-Modified-Since'] || undefined,
        'x-qs-copy-source-if-none-match': options['x-qs-copy-source-if-none-match'] || options['X-QS-Copy-Source-If-None-Match'] || undefined,
        'x-qs-copy-source-if-unmodified-since': options['x-qs-copy-source-if-unmodified-since'] || options['X-QS-Copy-Source-If-Unmodified-Since'] || undefined,
        'x-qs-encryption-customer-algorithm': options['x-qs-encryption-customer-algorithm'] || options['X-QS-Encryption-Customer-Algorithm'] || undefined,
        'x-qs-encryption-customer-key': options['x-qs-encryption-customer-key'] || options['X-QS-Encryption-Customer-Key'] || undefined,
        'x-qs-encryption-customer-key-md5': options['x-qs-encryption-customer-key-md5'] || options['X-QS-Encryption-Customer-Key-MD5'] || undefined,
      },
      'elements': {
      },
      'properties': this.properties,
      'body': options['body'] || undefined
    };
    operation.properties['object-key'] = object_key;
    this.uploadMultipartValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * uploadMultipart: Upload object multipart.
   * @link https://docs.qingcloud.com/qingstor/api/object/multipart/upload_multipart.html Documentation URL
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
   * @param object_key The object key
   *
   * @return none
   */
  uploadMultipart(object_key, options) {
    options = options || {};
    return this.uploadMultipartRequest(object_key, options).sign().send();
  }


  uploadMultipartValidate(operation) {
    if (operation['params'] === undefined || operation['params']['part_number'] === undefined || operation['params']['part_number'].toString() === '') {
      throw new SDKError.ParameterRequired('part_number', 'UploadMultipartInput');
    }
    if (operation['params'] === undefined || operation['params']['upload_id'] === undefined || operation['params']['upload_id'].toString() === '') {
      throw new SDKError.ParameterRequired('upload_id', 'UploadMultipartInput');
    }
  }

}

export default Bucket;






