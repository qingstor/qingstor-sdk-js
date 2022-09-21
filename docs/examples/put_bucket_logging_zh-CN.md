# 设置 Bucket Logging

## 准备工作

在设置 Logging 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.target_bucket - The name of the bucket used to store logs. The user must be the owner of the bucket.
 * @param options.target_prefix - generated log files' common prefix
 *
 * @return {Promise} axios response
 */
bucket.putLogging({
  target_bucket: '<bucket-name>',
  target_prefix: 'logs/',
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/logging/put_logging/)
