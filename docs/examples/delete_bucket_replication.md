# DELETE Bucket Replication

*Only the owner of the bucket is allowed to delete Replication.*

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
bucket.deleteReplication().then((response) => {
  // status == 204
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/replication/delete_replication/)
