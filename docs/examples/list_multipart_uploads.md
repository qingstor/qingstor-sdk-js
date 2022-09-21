# List Multipart Uploads

Get a list of ongoing multipart upload objects. When an object has the segment upload mode enabled via the Initiate Multipart interface, the object is in the "multiply uploading" state before the Complete Multipart or Abort Multipart interface is called. This object will appear in the list returned by the interface.

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `listMultipartUploads` for getting multipart uploads:

```javascript
/**
 * List multipart uploads in the bucket
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.listMultipartUploads(options).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### `listMultipartUploads` Method Signature

| Name | Type     | Description |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delimiter | `Char` | Put all keys that share a common prefix into a list. |
| key_marker | `String` | Limit results returned from the first key after key_marker sorted by alphabetical order. |
| limit | `Integer` | Results count limit. |
| prefix | `String` | Limits results to keys that begin with the prefix. |
| upload_id_marker | `String` | Limit results returned from the first uploading segment after upload_id_marker sorted by the time of upload_id. |

### Browser Environment

Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/list_multipart_uploads/)
