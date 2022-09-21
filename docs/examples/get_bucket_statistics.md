# Get Bucket Statistics

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `getStatistics` for getting statistics:

```javascript
/**
 * Get statistics information of the bucket
 *
 * @return {Promise} axios response
 */
bucket.getStatistics().then((response) => {
  // {
  //   "count": 11,
  //   "status": "active",
  //   "name": "test-bucket-pek1",
  //   "created": "2017-10-10T06:31:49.000Z",
  //   "url": "https://test-bucket-pek1.pek3a.qingstor.com",
  //   "location": "pek3a",
  //   "storage_classes": {
  //      "STANDARD": {
  //          "size": 2062548,
  //          "billing_size": 2062548,
  //          "count": 11
  //      },
  //      "STANDARD_IA": {
  //          "size": 0,
  //          "billing_size": 0,
  //          "count": 0
  //      }
  //   },
  //   "size": 2062548
  // }
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/get_stats/)
