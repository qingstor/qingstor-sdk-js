# HEAD Object

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `headObject`:

```javascript
/**
 * Check whether the object exists and available
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.headObject(object_key, options).then((response) => {
  // 200, {content-length: "8122", content-type: "text/markdown", last-modified: "Wed, 06 Nov 2019 17:13:35 GMT"}
  console.log(response.status, response.headers);
}).catch((error) => {
  console.log(error);
});
```

#### `headObject` Method Signature

The first parameter of `headObject` is the object key. It is not recommended to use the file name as the key of the object, as it may be duplicated. You can use `/` as the separator for key.

The second parameter is a Object, optional properties are as follow:

| Name     | Type     | Description   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Match | `string` | Check whether the ETag matches. |
| If-None-Match | `string` | Check whether the ETag does not match.  |
| If-Modified-Since | `Date` | Check whether the object has been modified.  |
| If-Unmodified-Since | `Date` | Check whether the object has not been modified. |
| X-QS-Encryption-Customer-Algorithm | `string` | Encryption algorithm of the object. Refer to [Encryption Doc](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)|
| X-QS-Encryption-Customer-Key | `string` | Encryption key of the object. Refer to [Encryption Doc](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)|
| X-QS-Encryption-Customer-Key-MD5 | `string` | MD5sum of encryption key. Refer to [Encryption Doc](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)|

### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/head/)
