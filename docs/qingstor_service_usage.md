# QingStor Service Usage Guide

Import the QingStor and initialize service with a config, and you are ready to use the initialized service. Service only contains one API, and it is "listBuckets".
To use bucket related APIs, you need to initialize a bucket from service using "Bucket" function.

``` javascript
var Config = require("qingstor-sdk").Config;
var Qingstor = require('qingstor-sdk').QingStor;
```

### Code Snippet

Initialize the QingStor service with a configuration

``` javascript
var config = new Config().loadUserConfig();
vat service = new QingStor(config);
```

List buckets

``` javascript
service.listBuckets({
  'location': 'pek3a'
}, function(err, res, data) {
  console.log(res.statusCode)
  console.log(res.buckets);
});
```

Initialize a QingStor bucket

``` javascript
bucket = service.Bucket("test-bucket", "pek3a");
```

List objects in the bucket

``` javascript
bucket.listObjects({}, function(err, res, data) {
  console.log(res.statusCode);
  console.log(res.keys);
});
```

Set ACL of the bucket

``` javascript
bucket.putACL({
  'acl': [{
    'grantee': {
      'type': 'user',
      'id': <user-id>
    },
    'permission': 'FULL_CONTROL'
  }, {
    'grantee': {
      'type': 'group',
      'name': <group-name>
    },
    'permission': 'READ'
  }]
}, function(err, res, data) {
  console.log(res.statusCode);
});
```

Put object

``` javascript
bucket.putObject('object', {
  'body': fs.readFileSync("/tmp/sdk_bin")
}, function(err, res, data) {
  console.log(res.statusCode);
});
```

Delete object

``` javascript
bucket.deleteObject('object', function(err, res, data) {
  console.log(res.statusCode);
});
```

Initialize Multipart Upload

``` javascript
bucket.initiateMultipartUpload('object_multipart', {},
  function(err, res, data) {
    init_output = res;
  }
);
```

Upload Multipart

``` javascript
bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '0',
  'body': fs.readFileSync('/tmp/sdk_bin_part_0')
}, function(err, res, data) {
  console.log(res.statusCode);
});

bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '1',
  'body': fs.readFileSync('/tmp/sdk_bin_part_1')
}, function(err, res, data) {
  console.log(res.statusCode);
});

bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '2',
  'body': fs.readFileSync('/tmp/sdk_bin_part_2')
}, function(err, res, data) {
  console.log(res.statusCode);
});
```

Complete Multipart Upload

``` javascript
bucket.listMultipart('object_multipart', {
  'upload_id': init_output['upload_id']
}, function(err, res, data) {
  list_output = res;
});

bucket.completeMultipartUpload('object_multipart', {
  'upload_id': init_output.upload_id,
  'etag': '"4072783b8efb99a9e5817067d68f61c6"',
  'object_parts': list_output.object_parts
}, function(err, res, data) {
  console.log(res.statusCode);
  console.log(data);
});
```

Abort Multipart Upload

``` javascript
bucket.abortMultipartUpload('object_multipart', {
  'upload_id': init_output.upload_id
}, function(err, res, data) {
  console.log(res.statusCode);
  console.log(data);
});
```