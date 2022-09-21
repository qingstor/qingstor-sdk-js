# PUT Bucket CNAME

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.domain - The domain name to be bound to the bucket. The domain name must have been registered and not bound to another bucket.
 * @param options.type - The purpose of the domain name to be bound. Currently supports two types, normal and website.
 *
 * @return {Promise} axios response
 */
bucket.putCNAME({
  type: 'normal',
  domain: 'example.com',
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cname/put_cname/)
