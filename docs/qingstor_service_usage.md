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
test_config = new Config().loadUserConfig();
test_service = new QingStor(test_config);
```

List buckets

``` javascript
test_service.listBuckets({'location': 'pek3a'}， function(err, res, data){
    console.log(res.statusCode)
    console.log(data);
});
```

Initialize a QingStor bucket

``` javascript
test_bucket = test_service.Bucket("test-bucket", "pek3a");
```

List objects in the bucket

``` javascript
test_bucket.listObjects({}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Set ACL of the bucket

``` javascript
test_bucket.putACL({
    'acl': [
        {
            "grantee": {
            "type": "user",
            "id": <user-id>
            },
            "permission": "FULL_CONTROL"
        },
        {
            "grantee": {
            "type": "group",
            "name": <group-name>
            },
            "permission": "READ"
        }
    ]
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Put object

``` javascript
test_bucket.putObject(arg1, {
    'body': fs.readFileSync("/tmp/sdk_bin")
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Delete object

``` javascript
test_bucket.deleteObject('test_object', function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Initialize Multipart Upload

``` javascript
test_bucket.initiateMultipartUpload('test_object_multipart', {}, 
    function (err, res, data) {
        test_res = res;
        console.log(data);
        init_output = JSON.parse(data);
    }
);
```

Upload Multipart

``` javascript
test_bucket.uploadMultipart('test_object_multipart', {
    'upload_id': init_output['upload_id'],
    'part_number': '0',
    'body': fs.readFileSync('/tmp/sdk_bin_part_0')
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});

test_bucket.uploadMultipart('test_object_multipart', {
    'upload_id': init_output['upload_id'],
    'part_number': '1',
    'body': fs.readFileSync('/tmp/sdk_bin_part_1')
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});

test_bucket.uploadMultipart('test_object_multipart', {
    'upload_id': init_output['upload_id'],
    'part_number': '2',
    'body': fs.readFileSync('/tmp/sdk_bin_part_2')
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Complete Multipart Upload

``` javascript
test_bucket.listMultipart('test_object_multipart', {
    'upload_id': init_output['upload_id']
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
    list_output = JSON.parse(data);
});

test_bucket.completeMultipartUpload('test_object_multipart', {
    'upload_id': init_output['upload_id'],
    'etag': '"4072783b8efb99a9e5817067d68f61c6"',
    'object_parts': list_output['object_parts']
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```

Abort Multipart Upload

``` javascript
test_bucket.abortMultipartUpload('test_object_multipart', {
    'upload_id': init_output['upload_id']
}, function (err, res, data) {
    console.log(res.statusCode);
    console.log(data);
});
```