# PUT Bucket CORS

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.cors_rules - Bucket CORS rules
 *
 * @return {Promise} axios response
 */
bucket.putCORS({
  "cors_rules": [
    {
      "allowed_origin": "http://*.qingcloud.com",
      "allowed_methods": [
          "PUT",
          "GET",
          "DELETE",
          "POST"
      ],
      "allowed_headers": [
          "x-qs-date",
          "Content-Type",
          "Content-MD5",
          "Authorization"
      ],
      "max_age_seconds": 200,
      "expose_headers": [
          "x-qs-date"
      ]
    },
    {
      "allowed_origin": "http://*.example.com",
      "allowed_methods": [
          "PUT",
          "GET",
          "DELETE",
          "POST"
      ],
      "allowed_headers": [
          "*"
      ],
      "max_age_seconds": 400
    },
  ],
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cors/put_cors/)
