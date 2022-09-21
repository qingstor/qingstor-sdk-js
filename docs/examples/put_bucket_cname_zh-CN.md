# 设置 Bucket 域名空间别名

## 准备工作

在设置 CNAME 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.domain - The domain name to be bound to the bucket. The domain name must have been registered and not bound to another bucket.
 * @param options.type - The purpose of the domain name to be bound. Currently supports two types, normal and website.
 *
 * @return {Promise} axios response
 */
bucket.putCNAME({
  type: 'normal',
  domain: 'example.com',
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cname/put_cname/)
