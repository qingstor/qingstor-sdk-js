# PUT Bucket Replication

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.rules - Bucket Replication rules
 *
 * @return {Promise} axios response
 */
bucket.putReplication({
  "rules": [
    {
      "id": "replicatin-1",
      "status": "enabled",
      "filters": {
        "prefix": "image"
      },
      "sync_marker": "disabled",
      "delete_marker": "disabled",
      "destination": {
        "bucket": "<bucket-name>",
        "storage_class": "standard_ia",
      },
    },
  ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/replication/put_replication/)
