# 删除一个存储空间（Bucket）

*存储空间需要为空，且是活跃状态才可以被删除。*

## 准备工作

在删除 Bucket 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

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

然后根据要删除的 Bucket 信息（Bucket Name, Zone）来初始化 Bucket。

```javascript
const bucket = qingstor.Bucket('your-bucket-name', 'zone-name');
```

bucket 对象创建完毕后，调用 delete 方法在指定的 Zone 删除 Bucket。

```javascript
bucket.delete().then(({ status }) => {
  // bucket 删除成功，status 应该为 204
  console.log(status);
}).catch((error) => {
  // bucket 删除失败，打印返回结果
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/delete/)
