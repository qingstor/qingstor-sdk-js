# List Buckets

## Prepare

You need to initialize the QingStor object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing QingStor.

## Code Snippet

QingStor has a method called `listBuckets`:

```javascript
/**
 * Retrieve the bucket list
 * @param {Object} options - User input options;
 * @param options.Location - Limits results to buckets that in the location
 *
 * @return {Promise} axios response
 */
qingstor.listBuckets(options).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### API Doc

List Buckets API: https://docs.qingcloud.com/qingstor/api/service/get
