# PUT Bucket Policy

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.statement - Bucket policy statement
 *
 * @return {Promise} axios response
 */
bucket.putPolicy({
  "statement": [
    {
      "id": "allow certain site to get objects",
      "user": "*",
      "action": ["get_object"],
      "effect": "allow",
      "resource": ["<bucket>/*"],
      "condition": {
        "string_like": {
          "Referer": [
            "*.example1.com",
            "*.example2.com"
          ]
        }
      }
    },
  ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/policy/put_policy/)
