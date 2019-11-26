# 获取 Buckets

## 准备工作

在获取 Buckets 之前需要先初始化 QingStor 对象，初始化 QingStor 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

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

### API 文档

获取 Buckets API 文档: https://docs.qingcloud.com/qingstor/api/service/get
