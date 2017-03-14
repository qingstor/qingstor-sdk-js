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

import _ from 'lodash/core';
import logger from 'loglevel';
import Request from '../request';

class Bucket {

  constructor(config, properties) {
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  delete(callback) {
    this.deleteRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  deleteCORS(callback) {
    this.deleteCORSRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  deleteExternalMirror(callback) {
    this.deleteExternalMirrorRequest().sign().send(callback);
  }


  deleteExternalMirrorValidate(operation) {}



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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  deletePolicy(callback) {
    this.deletePolicyRequest().sign().send(callback);
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
  deleteMultipleObjectsRequest(options) {
    let operation = {
      'api': 'DeleteMultipleObjects',
      'method': 'POST',
      'uri': '/<bucket-name>?delete',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'Content-MD5': _.result(options, 'Content-MD5', ''),
      },
      'elements': {
        'objects': _.result(options, 'objects', ''),
        'quiet': _.result(options, 'quiet', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
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
   * @param callback Callback function
   *
   * @return none
   */
  deleteMultipleObjects(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.deleteMultipleObjectsRequest(options).sign().send(callback);
  }


  deleteMultipleObjectsValidate(operation) {
    if (!operation['headers'].hasOwnProperty('Content-MD5') || _.isNull(operation['headers']['Content-MD5'])) {
      throw new SDKError.ParameterRequired('Content-MD5', 'DeleteMultipleObjectsInput');
    }
    if (!operation['elements'].hasOwnProperty('objects') || _.isNull(operation['elements']['objects'])) {
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  getACL(callback) {
    this.getACLRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  getCORS(callback) {
    this.getCORSRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  getExternalMirror(callback) {
    this.getExternalMirrorRequest().sign().send(callback);
  }


  getExternalMirrorValidate(operation) {}



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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  getPolicy(callback) {
    this.getPolicyRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  getStatistics(callback) {
    this.getStatisticsRequest().sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  head(callback) {
    this.headRequest().sign().send(callback);
  }


  headValidate(operation) {}



  /**
   * listMultipartUploadsRequest: Build ListMultipartUploads's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/list_multipart_uploads.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.delimiter - Put all keys that share a common prefix into a list
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   *
   * @return Signer
   */
  listMultipartUploadsRequest(options) {
    let operation = {
      'api': 'ListMultipartUploads',
      'method': 'GET',
      'uri': '/<bucket-name>?uploads',
      'params': {
        'delimiter': _.result(options, 'delimiter', ''),
        'limit': _.result(options, 'limit', ''),
        'marker': _.result(options, 'marker', ''),
        'prefix': _.result(options, 'prefix', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param options.limit - Results count limit
   * @param options.marker - Limit results to keys that start at this marker
   * @param options.prefix - Limits results to keys that begin with the prefix
   * @param callback Callback function
   *
   * @return none
   */
  listMultipartUploads(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.listMultipartUploadsRequest(options).sign().send(callback);
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
  listObjectsRequest(options) {
    let operation = {
      'api': 'ListObjects',
      'method': 'GET',
      'uri': '/<bucket-name>',
      'params': {
        'delimiter': _.result(options, 'delimiter', ''),
        'limit': _.result(options, 'limit', ''),
        'marker': _.result(options, 'marker', ''),
        'prefix': _.result(options, 'prefix', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  listObjects(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.listObjectsRequest(options).sign().send(callback);
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  put(callback) {
    this.putRequest().sign().send(callback);
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
  putACLRequest(options) {
    let operation = {
      'api': 'PutBucketACL',
      'method': 'PUT',
      'uri': '/<bucket-name>?acl',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'acl': _.result(options, 'acl', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
    };
    this.putACLValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putACL: Set ACL information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/put_acl.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.acl - Bucket ACL rules
   * @param callback Callback function
   *
   * @return none
   */
  putACL(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.putACLRequest(options).sign().send(callback);
  }


  putACLValidate(operation) {
    if (!operation['elements'].hasOwnProperty('acl') || _.isNull(operation['elements']['acl'])) {
      throw new SDKError.ParameterRequired('acl', 'PutBucketACLInput');
    }
    operation['elements']['acl'].forEach(function(value) {
      if (value.hasOwnProperty('grantee')) {
        if (!value["grantee"].hasOwnProperty('type') || _.isNull(value["grantee"]['type'])) {
          throw new SDKError.ParameterRequired('type', 'grantee');
        }
        if (!value["grantee"].hasOwnProperty('type') || _.isNull(value["grantee"]['type'])) {
          let type_valid_values = ["user", "group"];
          if (_.includes(type_valid_values, value["grantee"]['type'])) {
            throw new SDKError.ParameterValueNotAllowedError(
              'type',
              value["grantee"]['type'],
              type_valid_values
            )
          }
        }
      }
      if (!value.hasOwnProperty('grantee')) {
        throw new SDKError.ParameterRequired('grantee', 'acl');
      }
      if (!value.hasOwnProperty('permission') || _.isNull(value['permission'])) {
        throw new SDKError.ParameterRequired('permission', 'acl');
      }
      if (!value.hasOwnProperty('permission') || _.isNull(value['permission'])) {
        let permission_valid_values = ["READ", "WRITE", "FULL_CONTROL"];
        if (_.includes(permission_valid_values, value['permission'])) {
          throw new SDKError.ParameterValueNotAllowedError(
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
  putCORSRequest(options) {
    let operation = {
      'api': 'PutBucketCORS',
      'method': 'PUT',
      'uri': '/<bucket-name>?cors',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'cors_rules': _.result(options, 'cors_rules', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
    };
    this.putCORSValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putCORS: Set CORS information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/cors/put_cors.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.cors_rules - Bucket CORS rules
   * @param callback Callback function
   *
   * @return none
   */
  putCORS(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.putCORSRequest(options).sign().send(callback);
  }


  putCORSValidate(operation) {
    if (!operation['elements'].hasOwnProperty('cors_rules') || _.isNull(operation['elements']['cors_rules'])) {
      throw new SDKError.ParameterRequired('cors_rules', 'PutBucketCORSInput');
    }
    operation['elements']['cors_rules'].forEach(function(value) {
      if (!value.hasOwnProperty('allowed_methods') || _.isNull(value['allowed_methods'])) {
        throw new SDKError.ParameterRequired('allowed_methods', 'cors_rule');
      }
      if (!value.hasOwnProperty('allowed_origin') || _.isNull(value['allowed_origin'])) {
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
  putExternalMirrorRequest(options) {
    let operation = {
      'api': 'PutBucketExternalMirror',
      'method': 'PUT',
      'uri': '/<bucket-name>?mirror',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'source_site': _.result(options, 'source_site', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
    };
    this.putExternalMirrorValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putExternalMirror: Set external mirror of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/external_mirror/put_external_mirror.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.source_site - Source site url
   * @param callback Callback function
   *
   * @return none
   */
  putExternalMirror(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.putExternalMirrorRequest(options).sign().send(callback);
  }


  putExternalMirrorValidate(operation) {
    if (!operation['elements'].hasOwnProperty('source_site') || _.isNull(operation['elements']['source_site'])) {
      throw new SDKError.ParameterRequired('source_site', 'PutBucketExternalMirrorInput');
    }
  }



  /**
   * putPolicyRequest: Build PutPolicy's request
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   *
   * @return Signer
   */
  putPolicyRequest(options) {
    let operation = {
      'api': 'PutBucketPolicy',
      'method': 'PUT',
      'uri': '/<bucket-name>?policy',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
      },
      'elements': {
        'statement': _.result(options, 'statement', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
    };
    this.putPolicyValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putPolicy: Set policy information of the bucket.
   * @link https://docs.qingcloud.com/qingstor/api/bucket/policy/put_policy.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.statement - Bucket policy statement
   * @param callback Callback function
   *
   * @return none
   */
  putPolicy(options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.putPolicyRequest(options).sign().send(callback);
  }


  putPolicyValidate(operation) {
    if (!operation['elements'].hasOwnProperty('statement') || _.isNull(operation['elements']['statement'])) {
      throw new SDKError.ParameterRequired('statement', 'PutBucketPolicyInput');
    }
    operation['elements']['statement'].forEach(function(value) {
      if (!value.hasOwnProperty('action') || _.isNull(value['action'])) {
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
      if (!value.hasOwnProperty('effect') || _.isNull(value['effect'])) {
        throw new SDKError.ParameterRequired('effect', 'statement');
      }
      if (!value.hasOwnProperty('effect') || _.isNull(value['effect'])) {
        let effect_valid_values = ["allow", "deny"];
        if (_.includes(effect_valid_values, value['effect'])) {
          throw new SDKError.ParameterValueNotAllowedError(
            'effect',
            value['effect'],
            effect_valid_values
          )
        }
      }
      if (!value.hasOwnProperty('id') || _.isNull(value['id'])) {
        throw new SDKError.ParameterRequired('id', 'statement');
      }
      if (!value.hasOwnProperty('user') || _.isNull(value['user'])) {
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
  abortMultipartUploadRequest(object_key, options) {
    let operation = {
      'api': 'AbortMultipartUpload',
      'method': 'DELETE',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'upload_id': _.result(options, 'upload_id', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  abortMultipartUpload(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.abortMultipartUploadRequest(object_key, options).sign().send(callback);
  }


  abortMultipartUploadValidate(operation) {
    if (!operation['params'].hasOwnProperty('upload_id') || _.isNull(operation['params']['upload_id'])) {
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
  completeMultipartUploadRequest(object_key, options) {
    let operation = {
      'api': 'CompleteMultipartUpload',
      'method': 'POST',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'upload_id': _.result(options, 'upload_id', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'ETag': _.result(options, 'ETag', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
      },
      'elements': {
        'object_parts': _.result(options, 'object_parts', ''),
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
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
   * @param callback Callback function
   *
   * @return none
   */
  completeMultipartUpload(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.completeMultipartUploadRequest(object_key, options).sign().send(callback);
  }


  completeMultipartUploadValidate(operation) {
    if (!operation['params'].hasOwnProperty('upload_id') || _.isNull(operation['params']['upload_id'])) {
      throw new SDKError.ParameterRequired('upload_id', 'CompleteMultipartUploadInput');
    }
    operation['elements']['object_parts'].forEach(function(value) {
      if (!value.hasOwnProperty('part_number') || _.isNull(value['part_number'])) {
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
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  deleteObject(object_key, callback) {
    this.deleteObjectRequest(object_key).sign().send(callback);
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
  getObjectRequest(object_key, options) {
    let operation = {
      'api': 'GetObject',
      'method': 'GET',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'response-cache-control': _.result(options, 'response-cache-control', ''),
        'response-content-disposition': _.result(options, 'response-content-disposition', ''),
        'response-content-encoding': _.result(options, 'response-content-encoding', ''),
        'response-content-language': _.result(options, 'response-content-language', ''),
        'response-content-type': _.result(options, 'response-content-type', ''),
        'response-expires': _.result(options, 'response-expires', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'If-Match': _.result(options, 'If-Match', ''),
        'If-Modified-Since': _.result(options, 'If-Modified-Since', ''),
        'If-None-Match': _.result(options, 'If-None-Match', ''),
        'If-Unmodified-Since': _.result(options, 'If-Unmodified-Since', ''),
        'Range': _.result(options, 'Range', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
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
   * @param callback Callback function
   *
   * @return none
   */
  getObject(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.getObjectRequest(object_key, options).sign().send(callback);
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
  headObjectRequest(object_key, options) {
    let operation = {
      'api': 'HeadObject',
      'method': 'HEAD',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'If-Match': _.result(options, 'If-Match', ''),
        'If-Modified-Since': _.result(options, 'If-Modified-Since', ''),
        'If-None-Match': _.result(options, 'If-None-Match', ''),
        'If-Unmodified-Since': _.result(options, 'If-Unmodified-Since', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
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
   * @param callback Callback function
   *
   * @return none
   */
  headObject(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.headObjectRequest(object_key, options).sign().send(callback);
  }


  headObjectValidate(operation) {}



  /**
   * initiateMultipartUploadRequest: Build InitiateMultipartUpload's request
   * @link https://docs.qingcloud.com/qingstor/api/object/initiate_multipart_upload.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param object_key The object key
   *
   * @return Signer
   */
  initiateMultipartUploadRequest(object_key, options) {
    let operation = {
      'api': 'InitiateMultipartUpload',
      'method': 'POST',
      'uri': '/<bucket-name>/<object-key>?uploads',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'Content-Type': _.result(options, 'Content-Type', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
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
   * @param object_key The object key
   * @param callback Callback function
   *
   * @return none
   */
  initiateMultipartUpload(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.initiateMultipartUploadRequest(object_key, options).sign().send(callback);
  }


  initiateMultipartUploadValidate(operation) {}



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
  listMultipartRequest(object_key, options) {
    let operation = {
      'api': 'ListMultipart',
      'method': 'GET',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'limit': _.result(options, 'limit', ''),
        'part_number_marker': _.result(options, 'part_number_marker', ''),
        'upload_id': _.result(options, 'upload_id', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
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
   * @param callback Callback function
   *
   * @return none
   */
  listMultipart(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.listMultipartRequest(object_key, options).sign().send(callback);
  }


  listMultipartValidate(operation) {
    if (!operation['params'].hasOwnProperty('upload_id') || _.isNull(operation['params']['upload_id'])) {
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
  optionsObjectRequest(object_key, options) {
    let operation = {
      'api': 'OptionsObject',
      'method': 'OPTIONS',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'Access-Control-Request-Headers': _.result(options, 'Access-Control-Request-Headers', ''),
        'Access-Control-Request-Method': _.result(options, 'Access-Control-Request-Method', ''),
        'Origin': _.result(options, 'Origin', ''),
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
   * @param callback Callback function
   *
   * @return none
   */
  optionsObject(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.optionsObjectRequest(object_key, options).sign().send(callback);
  }


  optionsObjectValidate(operation) {
    if (!operation['headers'].hasOwnProperty('Access-Control-Request-Method') || _.isNull(operation['headers']['Access-Control-Request-Method'])) {
      throw new SDKError.ParameterRequired('Access-Control-Request-Method', 'OptionsObjectInput');
    }
    if (!operation['headers'].hasOwnProperty('Origin') || _.isNull(operation['headers']['Origin'])) {
      throw new SDKError.ParameterRequired('Origin', 'OptionsObjectInput');
    }
  }



  /**
   * putObjectRequest: Build PutObject's request
   * @link https://docs.qingcloud.com/qingstor/api/object/put.html Documentation URL
   * @param {Object} options - User input options;
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
   * @param object_key The object key
   *
   * @return Signer
   */
  putObjectRequest(object_key, options) {
    let operation = {
      'api': 'PutObject',
      'method': 'PUT',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'Content-Length': _.result(options, 'Content-Length', ''),
        'Content-MD5': _.result(options, 'Content-MD5', ''),
        'Content-Type': _.result(options, 'Content-Type', ''),
        'Expect': _.result(options, 'Expect', ''),
        'X-QS-Copy-Source': _.result(options, 'X-QS-Copy-Source', ''),
        'X-QS-Copy-Source-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Copy-Source-Encryption-Customer-Algorithm', ''),
        'X-QS-Copy-Source-Encryption-Customer-Key': _.result(options, 'X-QS-Copy-Source-Encryption-Customer-Key', ''),
        'X-QS-Copy-Source-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Copy-Source-Encryption-Customer-Key-MD5', ''),
        'X-QS-Copy-Source-If-Match': _.result(options, 'X-QS-Copy-Source-If-Match', ''),
        'X-QS-Copy-Source-If-Modified-Since': _.result(options, 'X-QS-Copy-Source-If-Modified-Since', ''),
        'X-QS-Copy-Source-If-None-Match': _.result(options, 'X-QS-Copy-Source-If-None-Match', ''),
        'X-QS-Copy-Source-If-Unmodified-Since': _.result(options, 'X-QS-Copy-Source-If-Unmodified-Since', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
        'X-QS-Fetch-If-Unmodified-Since': _.result(options, 'X-QS-Fetch-If-Unmodified-Since', ''),
        'X-QS-Fetch-Source': _.result(options, 'X-QS-Fetch-Source', ''),
        'X-QS-Move-Source': _.result(options, 'X-QS-Move-Source', ''),
      },
      'elements': {
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
    };
    operation.properties['object-key'] = object_key;
    this.putObjectValidate(operation);
    return new Request(this.config, operation).build();
  }



  /**
   * putObject: Upload the object.
   * @link https://docs.qingcloud.com/qingstor/api/object/put.html Documentation URL
   * @param {Object} options - User input options;
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
   * @param object_key The object key
   * @param callback Callback function
   *
   * @return none
   */
  putObject(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.putObjectRequest(object_key, options).sign().send(callback);
  }


  putObjectValidate(operation) {}



  /**
   * uploadMultipartRequest: Build UploadMultipart's request
   * @link https://docs.qingcloud.com/qingstor/api/object/multipart/upload_multipart.html Documentation URL
   * @param {Object} options - User input options;
   * @param options.Content-Length - Object multipart content length
   * @param options.Content-MD5 - Object multipart content MD5sum
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   *
   * @return Signer
   */
  uploadMultipartRequest(object_key, options) {
    let operation = {
      'api': 'UploadMultipart',
      'method': 'PUT',
      'uri': '/<bucket-name>/<object-key>',
      'params': {
        'part_number': _.result(options, 'part_number', ''),
        'upload_id': _.result(options, 'upload_id', ''),
      },
      'headers': {
        'Host': this.properties.zone + '.' + this.config.host,
        'Content-Length': _.result(options, 'Content-Length', ''),
        'Content-MD5': _.result(options, 'Content-MD5', ''),
        'X-QS-Encryption-Customer-Algorithm': _.result(options, 'X-QS-Encryption-Customer-Algorithm', ''),
        'X-QS-Encryption-Customer-Key': _.result(options, 'X-QS-Encryption-Customer-Key', ''),
        'X-QS-Encryption-Customer-Key-MD5': _.result(options, 'X-QS-Encryption-Customer-Key-MD5', ''),
      },
      'elements': {
      },
      'properties': this.properties,
      'body': _.result(options, 'body', '')
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
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   * @param object_key The object key
   * @param callback Callback function
   *
   * @return none
   */
  uploadMultipart(object_key, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.uploadMultipartRequest(object_key, options).sign().send(callback);
  }


  uploadMultipartValidate(operation) {
    if (!operation['params'].hasOwnProperty('part_number') || _.isNull(operation['params']['part_number'])) {
      throw new SDKError.ParameterRequired('part_number', 'UploadMultipartInput');
    }
    if (!operation['params'].hasOwnProperty('upload_id') || _.isNull(operation['params']['upload_id'])) {
      throw new SDKError.ParameterRequired('upload_id', 'UploadMultipartInput');
    }
  }

}

export default Bucket;






