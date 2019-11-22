# GET Bucket Notification

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `getNotification` for getting notification:

```javascript
/**
 * Get Notification information of the bucket
 *
 * @return {Promise} axios response
 */
bucket.getNotification().then((response) => {
  // {"notifications":[]}
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

### API Doc

GET Bucket Notification API: https://docs.qingcloud.com/qingstor/api/bucket/notification/get_notification
