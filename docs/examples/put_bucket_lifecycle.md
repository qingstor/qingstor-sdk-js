# PUT Bucket Lifecycle

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.rule - Bucket Lifecycle rule
 *
 * @return {Promise} axios response
 */
bucket.putLifecycle({
  "rule": [
      {
        "id": "delete-logs",
        "status": "enabled",
        "filter": {
          "prefix": "logs/"
        },
        "expiration": {
          "days": 180
        }
      }
    ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/lifecycle/put_lifecycle/)
