# Move Object

- This operation requires the requester to have read permission on the source bucket and write permission on the target bucket.
- The source bucket and destination bucket can be the same, so this interface can be used to rename Object.
- When the target Object already exists, the operation will overwrite the contents of the target object.
- Currently only supports moving between buckets within the same zone.
- If the source object is encrypted, the target object will also use the same encryption method, and all ciphertext and metadata will be preserved after the Move. Calling this API on an encrypted source object does not require an encrypted request header

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
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
 * @param options.X-QS-Metadata-Directive - Use for modified metadata, valid (COPY/REPLACE)
 * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
 * @param options.X-QS-Storage-Class - Specify the storage class for object
 *
 * @return {Promise} axios response
 */
bucket.putObject('<object-key>', {
  'X-QS-Move-Source': '/<source-bucket>/<source-object>',
}).then((response) => {
  // status == 201
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/move/)
