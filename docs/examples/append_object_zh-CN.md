# Append Object

用户可以调用该 API 接口以追加写的方式上传对象到 QingStor 对象存储。通过该接口创建的 Object 类型为 appendable。

## 准备工作

在 Append Object 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.Content-Length - Object content size
 * @param options.Content-MD5 - Object MD5sum
 * @param options.Content-Type - Object content type
 * @param options.X-QS-Storage-Class - Specify the storage class for object
 * @param options.position - Object append position
 *
 * @return {Promise} axios response
 */
bucket.appendObject('<object-key>', {
  position: <Integer>,
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/append/)
