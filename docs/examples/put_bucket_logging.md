# PUT Bucket Logging

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.target_bucket - The name of the bucket used to store logs. The user must be the owner of the bucket.
 * @param options.target_prefix - generated log files' common prefix
 *
 * @return {Promise} axios response
 */
bucket.putLogging({
  target_bucket: '<bucket-name>',
  target_prefix: 'logs/',
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/logging/put_logging/)
