# 设置 Bucket 事件通知

## 准备工作

在设置事件通知之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

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

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/notification/put_notification/)
