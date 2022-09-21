# 获取 Bucket 跨区域复制

## 准备工作

在获取跨区域复制之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
bucket.getReplication().then((response) => {
  // { rules: [] }
  console.log(response.data);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/replication/get_replication/)
