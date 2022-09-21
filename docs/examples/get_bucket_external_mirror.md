# GET Bucket External Mirror

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `getExternalMirror` for getting external mirror:

```javascript
/**
 * Get external mirror of the bucket
 *
 * @return {Promise} axios response
 */
bucket.getExternalMirror().then((response) => {
  // { source_site: 'https://example.com/' }
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/external_mirror/get_external_mirror/)
