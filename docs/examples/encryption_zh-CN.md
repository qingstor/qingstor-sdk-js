# 数据加密

## 准备工作

上传时可对数据进行加密。访问该链接 [https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/).
以更好的理解数据加密解密的过程。

在对文件进行加密或解密之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

对上传的对象进行加密处理。通过设置 putOptions 中的相关项来进行加密设置。

```javascript
import md5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';

const objectKey = "your_file_will_put_and_encrypted";

const putOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": Base64.stringify("YOUR-AES256-SECRET-KEY"),
  "X-QS-Encryption-Customer-Key-MD5": Base64.stringify(md5("YOUR-AES256-SECRET-KEY"))
}

// 调用 putObject 向存储空间上传一个对象。

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

const objectKey = "your_encrypted_file_will_get";

const getOptions = {
  "X-QS-Encryption-Customer-Algorithm": "AES256",
  "X-QS-Encryption-Customer-Key": Base64.stringify("YOUR-AES256-SECRET-KEY"),
  "X-QS-Encryption-Customer-Key-MD5": Base64.stringify(md5("YOUR-AES256-SECRET-KEY"))
}

// 调用 getObject 获取加密的对象。

bucket.getObject(objectKey, getOptions).then(({ status }) => {
  // 对象下载成功，status 应该为 200
  console.log(status);
}).catch((error) => {
  // 对象下载失败，打印返回结果
  console.log(error.response.data);
});
```
