# 设置 Bucket 外部镜像

## 准备工作

在设置外部镜像之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.source_site - Source site url
 *
 * @return {Promise} axios response
 */
bucket.putExternalMirror({
  "source_site": "http://example.com:80/image/"
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/external_mirror/put_external_mirror/)
