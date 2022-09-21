# List Objects

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `listObjects` for getting objects:

```javascript
/**
 * Retrieve the object list in a bucket
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.listObjects().then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### `listObjects` Method Signature

| Name | Type     | Description |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delimiter | `Char` | Put all keys that share a common prefix into a list. |
| limit | `Integer` | Results count limit. |
| marker | `String` | Limit results to keys that start at this marker. |
| prefix | `String` | Limits results to keys that begin with the prefix. |

### Browser Environment
Set Bucket CORS before use to allow the current domain name to access your resources.

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/get/)
