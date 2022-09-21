# PUT Bucket Notification

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.notifications - Bucket Notification
 *
 * @return {Promise} axios response
 */
bucket.putNotification({
  "notifications": [
    {
      "cloudfunc": "notifier",
      "event_types": [
        "create_object"
      ],
      "id": "notificaion-1",
      "object_filters": [
        "*"
      ],
      "notify_url": "http://user_notify_url"
    }
  ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/notification/put_notification/)
