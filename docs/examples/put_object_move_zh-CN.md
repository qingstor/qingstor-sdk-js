# 移动 Object

- 此操作要求请求者对源 Bucket 拥有可读权限，对目标 Bucket 拥有可写权限。
- 源 Bucket 与目标 Bucket 可相同，因此该接口可用于重命名 Object。
- 当目标 Object 已存在时，该操作会对目标对象的内容进行覆盖。
- 目前只支持在同一个 Zone 内的 Bucket 间进行移动。
- 如果源 Object 是加密的，那么目标 Object 也会使用同样的加密方式，且 Move 后会保留所有密文和元数据。对加密的源 Object 调用该 API 不需要提供加密请求头。

## 准备工作

在移动 Object 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

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
  'X-QS-Move-Source': '/<source-bucket>/<source-object>',
}).then((response) => {
  // status == 201
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/move/)
