# Append Object

Users can call this API to upload objects to QingStor object storage by appending. Objects created through this interface are of type appendable.

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.Content-Length - Object content size
 * @param options.Content-MD5 - Object MD5sum
 * @param options.Content-Type - Object content type
 * @param options.X-QS-Storage-Class - Specify the storage class for object
 * @param options.position - Object append position
 *
 * @return {Promise} axios response
 */
bucket.appendObject('<object-key>', {
  position: <Integer>,
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/append/)
