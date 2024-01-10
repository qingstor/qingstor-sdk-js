# Encryption Example

### Code Snippet

You can encrypt data when uploading. To understand the process of encryption better, visit the link [https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/) .

Encrypt when uploading files. The encryption operation is performed by setting related items in putOptions struct.

```javascript
import md5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';

const objectKey = "your_file_will_put_and_encrypted";

const putOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": Base64.stringify("YOUR-AES256-SECRET-KEY"),
  "X-QS-Encryption-Customer-Key-MD5": Base64.stringify(md5("YOUR-AES256-SECRET-KEY"))
}

bucket.putObject(objectKey, putOptions).then(({ status }) => {
  // Object has been put successfully, status should be 201.
  console.log(status);
}).catch((error) => {
  // Put object failed, you can print error details.
  console.log(error.response.data);
});
```

Downloading an encrypted file requires decrypting the file. It also need set the getOptions parameter. Please refer to the following example:

```javascript

const objectKey = "your_encrypted_file_will_get";

const getOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": Base64.stringify("YOUR-AES256-SECRET-KEY"),
  "X-QS-Encryption-Customer-Key-MD5": Base64.stringify(md5("YOUR-AES256-SECRET-KEY"))
}

bucket.getObject(objectKey, getOptions).then(({ status }) => {
  // Get object successfully, status should be 200.
  console.log(status);
}).catch((error) => {
  // Get object failed, you can print error details.
  console.log(error.response.data);
});
```
