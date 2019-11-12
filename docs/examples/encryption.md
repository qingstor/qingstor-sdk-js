# Encryption Example

### Code Snippet

You can encrypt data when uploading.

To understand the process of encryption better, visit the link [https://docs.qingcloud.com/qingstor/api/common/encryption.html#object-storage-encryption-headers](https://docs.qingcloud.com/qingstor/api/common/encryption.html#object-storage-encryption-headers) .

Encrypt when uploading files. The encryption operation is performed by setting related items in putOptions struct.

```javascript
const putOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": "key",
  "X-QS-Encryption-Customer-Key-MD5": "MD5 of the ke"
}
const objectKey := "your_file_encrypted"
bucket.putObject(objectKey, putOptions).then(({ status }) => {
  // Put object successfully
  console.log(status);
}).catch((error) => {
  // Put object failed
  console.log(error.response.data);
});
```

Downloading an encrypted file requires decrypting the file. It also need set the getOptions parameter. Please refer to the following example:
```javascript
const getOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": "key",
  "X-QS-Encryption-Customer-Key-MD5": "MD5 of the ke"
}
const objectKey := "your_file_encrypted"
bucket.getObject(objectKey, getOptions).then(({ status }) => {
  // Get object successfully
  console.log(status);
}).catch((error) => {
  // Get object failed
  console.log(error.response.data);
});
```
