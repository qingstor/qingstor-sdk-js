# 删除 Bucket 跨区域复制

*跨区域复制 只有存储空间的所有者才能删除。*

## 准备工作

在删除跨区域复制之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
bucket.deleteReplication().then((response) => {
  // status == 204
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/replication/delete_replication/)
