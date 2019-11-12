# 数据加密

## 代码片段

上传时可对数据进行加密。

访问该链接 [https://docs.qingcloud.com/qingstor/api/common/encryption.html#object-storage-encryption-headers](https://docs.qingcloud.com/qingstor/api/common/encryption.html#object-storage-encryption-headers) .
以更好的理解数据加密解密的过程。

上传文件时加密。通过设置 putOptions 中的相关项来进行加密操作。

```javascript
const putOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": "key",
  "X-QS-Encryption-Customer-Key-MD5": "MD5 of the ke"
}
const objectKey := "your_file_encrypted"
bucket.putObject(objectKey, putOptions).then(({ status }) => {
  // 对象上传成功，status 应该为 201
  console.log(status);
}).catch((error) => {
  // 对象上传失败，打印返回结果
  console.log(error.response.data);
});
```

下载加密文件需要对文件进行解密，同样是通过设置 getOptions 对应参数。请参考以下示例：

```javascript
const getOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": "key",
  "X-QS-Encryption-Customer-Key-MD5": "MD5 of the ke"
}
const objectKey := "your_file_encrypted"
bucket.getObject(objectKey, getOptions).then(({ status }) => {
  // 对象下载成功，status 应该为 200
  console.log(status);
}).catch((error) => {
  // 对象下载失败，打印返回结果
  console.log(error.response.data);
});
```
