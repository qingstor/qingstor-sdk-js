# Head a Bucket

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `head`:

```javascript
/**
 * Check whether the bucket exists and available
 *
 * @return {Promise} axios response
 */
bucket.head().then((response) => {
  // 200
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```

### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/head/)
