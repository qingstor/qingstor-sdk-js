# 获取 Buckets

## 准备工作

在获取 Buckets 之前需要先初始化 QingStor 对象，初始化 QingStor 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用 QingStor 对象中的 `listBuckets` 方法获取 Buckets:

```javascript
/**
 * Retrieve the bucket list
 * @param {Object} options - User input options;
 * @param options.Location - Limits results to buckets that in the location
 *
 * @return {Promise} axios response
 */
qingstor.listBuckets(options).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/service/get/)
