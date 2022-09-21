# 从存储空间中删除单个对象

*此操作要求请求者对存储空间拥有可写权限。*
>如果存储空间被设置为对匿名用户可写，则请求不需要携带认证信息。然而如果携带了认证信息，但是认证用户不拥有该存储空间的可写权限，则请求该接口会返回权限错误。

## 准备工作

在删除对象之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用您的 AccessKeyID 和 SecretAccessKey 初始化 Qingstor 对象。

```javascript
import { QingStor, Config } from 'qingstor-sdk';

// 先初始化 config 对象
const config = new Config({
  access_key_id: "YOUR-ACCESS-KEY-ID",
  secret_access_key: "YOUR--SECRET-ACCESS-KEY",
});

// 如果在浏览器 Browser 环境中使用 SDK，我们强烈建议使用签名服务器初始化 config 对象，避免将 AccessKeyID 和 SecretAccessKey 暴露在客户端。目前 node 环境不支持使用签名服务器。
const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});

const qingstor = new QingStor(config);
```

然后根据要操作的 Bucket 信息（Bucket Name, Zone）来初始化 Bucket。

```javascript
const bucket = qingstor.Bucket('your-bucket-name', 'zone-name');
```

bucket 对象创建完毕后，需要创建 deleteObject 方法用到的参数。
然后调用 deleteObject 从存储空间中删除指定对象。

```javascript
const objectKey = "file_your_want_delete";

bucket.deleteObject(objectKey).then(({ status }) => {
  // 对象删除成功，status 应该为 204
  console.log(status);
}).catch((error) => {
  // 对象删除失败，打印返回结果
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/delete/)
