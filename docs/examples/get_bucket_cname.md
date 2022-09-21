# GET Bucket CNAME

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.type - Limit the type used for query, normal will be recognized if empty.
 *
 * @return {Promise} axios response
 */
bucket.getCNAME().then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cname/get_cname/)
