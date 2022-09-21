# 设置 Bucket 存储空间策略

## 准备工作

在设置存储空间策略之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.rules - Bucket Replication rules
 *
 * @return {Promise} axios response
 */
bucket.putReplication({
  "rules": [
    {
      "id": "replicatin-1",
      "status": "enabled",
      "filters": {
        "prefix": "image"
      },
      "sync_marker": "disabled",
      "delete_marker": "disabled",
      "destination": {
        "bucket": "<bucket-name>",
        "storage_class": "standard_ia",
      },
    },
  ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/replication/put_replication/)
