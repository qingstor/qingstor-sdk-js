# QingStor Service Usage Guide

Import the QingStor and initialize service with a config, and you are ready to use the initialized service. Service only contains one API, and it is "listBuckets".

To use bucket related APIs, you need to initialize a bucket from service using "Bucket" function.

```javascript
// in browser
import { Config, QingStor } from 'qingstor-sdk/dist/qingstor-sdk-browser';

// in Node.js
import { Config, QingStor } from 'qingstor-sdk/dist/qingstor-sdk-node';
```

### Code Snippet

Initialize the QingStor service with a configuration

```javascript
const config = new Config('ACCESS_KEY_ID_EXAMPLE', 'SECRET_ACCESS_KEY_EXAMPLE');
const service = new QingStor(config);
```

List buckets

```javascript
service.listBuckets({
  'location': 'pek3a'
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

Initialize a QingStor bucket

```javascript
const bucket = service.Bucket('test-bucket', 'pek3a');
```

List objects in the bucket

```javascript
// list objects under perfix '/images'
bucket.listObjects({
  limit: 10,
  prefix: '/images',
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

Set ACL of the bucket

```javascript
bucket.putACL({
  acl: [{
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
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```

Put object

```javascript
// in browser
const input = document.getElementById('file-input');
input.addEventListener('change', (e) => {
  const file = e.target.files[0];

  bucket.putObject(file.name, {
    body: file,
  }).then((response) => {
    console.log(response.status);
  }).catch((error) => {
    console.log(error);
  });
});

// in Node.js, upload object from string
fs.readFile('./path/to/index.html', 'utf8', (error, data) => {
  bucket.putObject('mark-test-file', {
    body: data,
    // ATTENTION: please specify content-type
    'content-type': 'text/html',
  }).then((response) => {
    console.log(response.status);
  }).catch((error) => {
    console.log(error)
  });
});

// in Node.js, upload object from buffer
fs.readFile('./qingstor-sdk.js', (error, data) => {
  bucket.putObject('mark-test-file', {
    body: data,
    // ATTENTION: please specify content-type
    'content-type': 'text/html',
  }).then((response) => {
    console.log(esponse.status);
  }).catch((error) => {
    console.log(error)
  });
});

// in Node.js, upload object from stream
const filePath = '/path/to/some-large-file';
fs.readFile(filePath, (error, data) => {
  bucket.putObject(filePath, {
    body: fs.createReadStream(filePath, {encoding: 'utf8'}),
    // ATTENTION: please specify content-type
    'content-type': 'application/octet-stream',
  }).then((response) => {
    console.log(response.status);
  }).catch((error) => {
    console.log(error)
  });
});
```

Download object

```javascript
// in browser
bucket.getObject('index.html').then((response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'index.html');
  document.body.appendChild(link);
  link.click();

}).catch((error) => {
  console.log(error);
});

// in Node.js
bucket.getObject('message.txt').then((response) => {
  fs.writeFile('message.txt', response.data, (err) => {
  if (err) throw err;
    console.log('The file has been saved!');
  });
}).catch((error) => {
  console.log(error);
});
```

Delete object

```javascript
bucket.deleteObject('object').then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});
```

Initialize Multipart Upload

```javascript
bucket.initiateMultipartUpload('object_multipart').then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});
```

Upload Multipart

```javascript
bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '0',
  // ATTENTION: please specify content-type
  'content-type': 'octet-stream',
  'body': fs.createReadStream('/tmp/sdk_bin_part_0')
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});

bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '1',
  // ATTENTION: please specify content-type
  'content-type': 'octet-stream',
  'body': fs.createReadStream('/tmp/sdk_bin_part_1')
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});

bucket.uploadMultipart('object_multipart', {
  'upload_id': init_output.upload_id,
  'part_number': '2',
  // ATTENTION: please specify content-type
  'content-type': 'octet-stream',
  'body': fs.createReadStream('/tmp/sdk_bin_part_2')
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});
```

Complete Multipart Upload

```javascript
bucket.listMultipart('object_multipart', {
  'upload_id': init_output['upload_id']
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});

bucket.completeMultipartUpload('object_multipart', {
  'upload_id': init_output.upload_id,
  'etag': '"4072783b8efb99a9e5817067d68f61c6"',
  'object_parts': list_output.object_parts
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});
```

Abort Multipart Upload

```javascript
bucket.abortMultipartUpload('object_multipart', {
  'upload_id': init_output.upload_id
}).then((response) => {
  console.log(response.status);
}).catch((error) => {
  console.log(error)
});
```
