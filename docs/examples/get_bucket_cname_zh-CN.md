# 获取 Bucket 域名空间别名

## 准备工作

在获取 CNAME 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.type - Limit the type used for query, normal will be recognized if empty.
 *
 * @return {Promise} axios response
 */
bucket.getCNAME().then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cname/)
