# 分段上传文件

## 准备工作

在向 Bucket 上传文件之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。


## 初始化分段上传

在使用分段上传之前，需要初始化一个 Object 分段上传，QingStor 对象存储返回该 Object 分段上传的唯一 Upload Id。

```javascript
/**
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return {Promise} axios response
   */
bucket.initiateMultipartUpload('/path/to/some_object').then((response) => {
  // 得到如下格式的结果
  // {
  //   bucket: <Bucket>,
  //   key: '/path/to/some_object',
  //   upload_id: <upload-ID>,
  // }
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```


## 大文件分段

使用 Multipart 上传方式有如下几个限制：

- 每个分段最大为 5GB。
- 由 Upload Id 唯一标识的一个分段上传过程，最多可以支持的分段数量为 10000。
- 除最后一个分段不限最小长度以外，其它分段最小为 4MB。
- 一个 Object 的各个分片长度不要求一样。

客户端可以根据实际需求选择分段大小。比如在外网环境，由于公网传输速度是由多种因素决定，其大小可能受到限制，考虑到保证服务端和客户端的交互，QingStor 对象存储建议，此时，客户端可以采用较小的长度来进行分段。

分段可以是如下类型：

- `string`
- `Blob` 既浏览器环境下的 File 对象，Node 中没有此类型
- `Buffer` 仅在 Node 环境下可用
- `Stream` 仅在 Node 环境下可用

```javascript
import fs from 'fs';

const chunkSize = 64 * 1024 * 1024;
const file = fs.readFileSync('<FILE PATH>');
const maxChunk = Math.ceil(file.length / chunkSize);

let chunks = [];
for (let i = 0; i < maxChunk; i ++) {
  chunks[i] = file.slice(i * chunkSize, i * chunkSize + chunkSize);
}

//  [
//    <Buffer ... 67108814 more bytes>,
//    ...
//  ]
console.log(chunks);
```


## 分段上传

根据 Object 内容偏移依次读取文件数据，并为每个分段标上大于等于 0 的整数标识后，调用 uploadMultipart 完成上传。

```javascript
chunks.map((chunk, index) => {
  /**
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Length - Object multipart content length
   * @param options.Content-MD5 - Object multipart content MD5sum
   * @param options.X-QS-Copy-Range - Specify range of the source object
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the Etag of copy source matches the specified value
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified since the specified date
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the Etag of copy source does not matches the specified value
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been unmodified since the specified date
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return {Promise} axios response
   */
  bucket.uploadMultipart('/path/to/some_object', {
    body: chunk,
    upload_id: '<upload-ID>',
    part_number: index.toString(),
  }).then((response) => {
    // 如果上传成功，得到的 status 应该是 201
    console.log(response.status);
  }).catch((error) => {
    console.log(error);
  });
});
```


## 合并对象分段

该 API 接口用于结束一个分段上传，从而获得一个完整的 Object。当一个分段上传完成后，用户未调用该接口，则该分段上传仍然处于未完成的状态，此时调用 GET 请求获得该 Object 会返回错误。

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.ETag - MD5sum of the object part
 * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
 * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
 * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
 * @param options.upload_id - Object multipart upload ID
 * @param options.object_parts - Object parts
 *
 * @return {Promise} axios response
 */
bucket.completeMultipartUpload('/path/to/some_object', {
  upload_id: '<upload-ID>',
  object_parts: chunks.map((chunk, i) => {
    return { part_number: i };
  }),
}).then((response) => {
  // 如果合并成功，得到的 status 应该是 201
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```


## 取消对象分段

该 API 接口用于终止一个分段上传，并删除已经上传的分段。

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.upload_id - Object multipart upload ID
 *
 * @return {Promise} axios response
 */
bucket.abortMultipartUpload('/path/to/some_object', {
  upload_id: '<upload-ID>',
}).then((response) => {
  // 如果取消成功，得到的 status 应该是 204
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```


### API 文档

上传文件 API 文档: https://docsv3.qingcloud.com/storage/object-storage/api/object/multipart/