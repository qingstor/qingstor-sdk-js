# 获取 Bucket 事件通知策略

## 准备工作

在获取事件通知策略之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用 Bucket 对象中的 `getNotification` 方法获取事件通知策略:

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

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/notification/get_notification/)
