# PUT Bucket External Mirror

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.source_site - Source site url
 *
 * @return {Promise} axios response
 */
bucket.putExternalMirror({
  "source_site": "http://example.com:80/image/"
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/external_mirror/put_external_mirror/)
