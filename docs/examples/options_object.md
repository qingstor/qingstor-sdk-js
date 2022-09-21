# OPTIONS Object

When the user's request is a cross-origin request, an HTTP query request needs to be added before the formal communication to ask the source where the server is currently located, whether it is in the server's whitelist, and which HTTP actions and header information can be used.

This API interface is used to initiate a pre-check request to the Object stored in QingStor to determine whether it can respond to the cross-origin request.

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.


## Code Snippet

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.Access-Control-Request-Headers - Request headers
 * @param options.Access-Control-Request-Method - Request method
 * @param options.Origin - Request origin
 *
 * @return {Promise} axios response
 */
bucket.optionsObject('<object-key>', {
  'Origin': 'example.com',
  'Access-Control-Request-Method': 'GET',
}).then((res) => {
  // {
  //   'access-control-max-age': '0',
  //   'access-control-allow-methods': 'GET',
  //   'access-control-allow-origin': '*',
  // }
  console.log(res.headers);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/options_object/)
