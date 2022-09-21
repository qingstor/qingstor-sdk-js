# 列取分段上传

获取正在进行的分段上传对象的列表。当一个对象通过 Initiate Multipart 接口开启了分段上传模式，在调用 Complete Multipart 或 Abort Multipart 接口之前，该对象处于“正在进行分段上传”的状态，此对象将会出现在该接口返回的列表里。

## 准备工作

在列取分段上传之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用 Bucket 对象中的 `listMultipartUploads` 方法列取分段上传:

```javascript
/**
 * List multipart uploads in the bucket
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.listMultipartUploads(options).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### `listMultipartUploads` 方法参数说明

| 名称 | 类型     | 描述 |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delimiter | `Char` | 用于给对象名分组的字符。返回的对象名是从指定的 prefix 开始，到第一次出现 delimiter 字符之间的对象名。 |
| key_marker | `String` | 设定结果从 key 之后按字母排序的第一个分段上传开始返回。 |
| limit | `Integer` | 限定此次返回的分段对象的最大数量，默认值为 200，最大允许设置 1000。 |
| prefix | `String` | 限定返回的分段上传对象名必须以 prefix 作为前缀。 |
| upload_id_marker | `String` | 设定结果从 upload_id 之后按时间排序的第一个分段上传开始返回。 |

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/list_multipart_uploads/)
