# 获取文件的下载地址

## 代码片段

使用您的 AccessKeyID 和 SecretAccessKey 初始化 Qingstor Signer 对象。

```javascript
import { Signer } from 'qingstor-sdk';

const signer = new Signer('YOUR-ACCESS-KEY-ID', 'YOUR-SECRET-ACCESS-KEY');
```

然后调用 getQuerySignature 方法获取对象签名并拼接下载地址。object_key 设置要获取的对象的 filepath（位于当前 bucket 中）。

```javascript
const { expires, signature, access_key_id } = signer.getQuerySignature({
  method: 'GET',
  expiresTTL: 300,
  path: object_key,
}); 

const bucketName = 'your-bucket-name';
const host = 'zone.qingstor.com';
const url = `https://${bucketName}.${host}/${object_key}?expires=${expires}&signature=${signature}&access_key_id=${access_key_id}`;

console.log(url);
```
