# 抓取 Object

该 API 接口用于从指定的源链接抓取资源，保存到指定的 Object 中。

- QingStor 在抓取时能够自动处理源链接服务器返回的 301/302/307 等重定向请求。
- QingStor 在上传 Object 时需要知道文件大小，所以需要源站在提供下载文件时能返回 Content-Length 头字段，否则将抓取失败。
- 当要保存的目标 Object 已存在时，本操作会对该 Object 的内容进行覆盖。

## 准备工作

在抓取 Object 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.Cache-Control - Object cache control
 * @param options.Content-Encoding - Object content encoding
 * @param options.Content-Length - Object content size
 * @param options.Content-MD5 - Object MD5sum
 * @param options.Content-Type - Object content type
 * @param options.Expect - Used to indicate that particular server behaviors are required by the client
 * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
 * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
 * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
 * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
 * @param options.X-QS-Copy-Source-If-Match - Check whether the copy source matches
 * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified
 * @param options.X-QS-Copy-Source-If-None-Match - Check whether the copy source does not match
 * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been modified
 * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
 * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
 * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
 * @param options.X-QS-Fetch-If-Unmodified-Since - Check whether fetch target object has not been modified
 * @param options.X-QS-Fetch-Source - Fetch source, should be a valid url
 * @param options.X-QS-MetaData - User-defined metadata
 * @param options.X-QS-Metadata-Directive - Use for modified metadata, valid (COPY/REPLACE)
 * @param options.X-QS-Move-Source - Move source, format (/<bucket-name>/<object-key>)
 * @param options.X-QS-Storage-Class - Specify the storage class for object
 *
 * @return {Promise} axios response
 */
bucket.putObject('<object-key>', {
  'X-QS-Fetch-Source': 'http://image.example.com/photo.jpg',
}).then((response) => {
  // status == 201
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/fetch/)
