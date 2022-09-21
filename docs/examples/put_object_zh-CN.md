# 上传文件

## 准备工作

在向 Bucket 上传文件之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

## 代码片段

使用 Bucket 对象中的 `putObject` 方法上传文件:

```javascript
/**
 * Upload object to bucket
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.putObject('/path/to/some_object', {
  'content-type': 'text/html',
  body: file,
}).then((response) => {
  // 如果上传成功，得到的 status 应该是 201
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});

```

### `putObject` 方法参数说明

`putObject` 的第一个参数是文件在 Bucket 中的 key，不推荐直接使用文件名，因为可能会重名，推荐使用 `/` 作为 key 中的分隔符。

第二个参数是一个 Object，Object 中的 `body` 参数为要上传的文件，上面示例中的 `file` 可以是如下类型:

- `string`
- `Blob` 既浏览器环境下的 File 对象，Node 中没有此类型
- `Buffer` 仅在 Node 环境下可用
- `Stream` 仅在 Node 环境下可用

上传到 Bucket 中的文件类型其实由上传请求 header 中的 `content-type` 决定。SDK 默认使用的 `content-type` 是 `application/octet-stream`。在浏览器环境下上传一个 File 时，如果**不指定** `content-type`，那 SDK 会默认使用此 File 的 `type` 属性值作为请求 header 中的 `content-type` 值，例如上传的一个 png 格式的图片，则请求 header 中的 `content-type` 值为 `image/png`。

`putObject` 方法的第二个参数是一个 Object，除了 `body` 属性表示要上传的文件外，还有如下可选参数:

| 名称               | 类型     | 描述                                                                                                                                                                                                            |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cache-control      | `string` | 指定请求和响应遵循的缓存机制，例如 `max-age=3600`。 参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)                                                                    |
| content-encoding   | `string` | 指定对象的内容编码类型，例如 `gzip`。                                                                                                                                                                           |
| content-md5        | `string` | 对象实体的 MD5 值，用于检查对象在传输过程中字符是否出错或被篡改。                                                                                                                                               |
| content-type       | `string` | 指定上传文件的 MIME 类型，例如 `image/png`。参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)                                                                             |
| expect             | `string` | 如果请求头附加这个参数，不需要附带 request body，对象存储服务端判断可以接受此请求，则返回 100 CONTINUE，例如 `100-continue`。 参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect) |
| x-qs-storage-class | `string` | 指定该对象的存储级别，支持的存储级别为 “STANDARD” 和 “STANDARD_IA”，默认存储级别为”STANDARD”。存储级别错误将返回 `400 INVALID_REQUEST`。                                                                        |

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/put/)
