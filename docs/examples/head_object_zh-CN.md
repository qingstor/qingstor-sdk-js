# 获取文件的元数据 

## 准备工作

在获取文件的元数据之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

## 代码片段

使用 Bucket 对象中的 `headObject` 方法获取文件的元数据:

```javascript
/**
 * Check whether the object exists and available
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.headObject(object_key).then((response) => {
  // 200, {content-length: "8122", content-type: "text/markdown", last-modified: "Wed, 06 Nov 2019 17:13:35 GMT"}
  console.log(response.status, response.headers);
}).catch((error) => {
  console.log(error);
});
```

#### `headObject` 方法参数说明

`headObject` 的第一个参数是文件在 Bucket 中的 key，不推荐直接使用文件名，因为可能会重名，推荐使用 `/` 作为 key 中的分隔符。

第二个参数是一个 Object，可选参数如下：

| 名称     | 类型     | 描述   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Match | `string` | 如果对象内容的 ETag 值符合给定的值，则正常下载对象，并返回 200 OK；否则返回 412 PRECONDITION FAILED。该值请使用 HTTP 规范所规定的格式。 |
| If-None-Match | `string` | 如果对象内容的 ETag 值不同于给定的值，则正常下载对象，并返回 200 OK；否则返回 304 NOT MODIFIED。  |
| If-Modified-Since | `Date` | 如果该对象自从指定时间往后被修改过，则正常下载对象，并返回 200 OK；否则返回 304 NOT MODIFIED。  |
| If-Unmodified-Since | `Date` | 如果该对象自从指定时间往后没有被修改过，则正常下载对象，并返回 200 OK；否则返回 412 PRECONDITION FAILED。 |
| X-QS-Encryption-Customer-Algorithm | `string` | 源对象的加密算法 。目前支持的加密算法是 AES256。 详情参考[这里](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)。|
| X-QS-Encryption-Customer-Key | `string` | 源对象的密钥。密钥必须进行 Base64 编码处理，对于AES256的密钥，明文必须具有32字节长度。详情参考[这里](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)。|
| X-QS-Encryption-Customer-Key-MD5 | `string` | 源对象的密钥的 MD5。密钥 MD5 必须进行 Base64 编码处理。 详情参考[这里](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)。|

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

### API 文档

获取元数据  API 文档: https://docs.qingcloud.com/qingstor/api/object/head
