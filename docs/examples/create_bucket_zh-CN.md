# 创建一个存储空间（Bucket）

*创建成功后，存储空间的 owner 就是 API 调用者。*

## 准备工作

在创建 Bucket 之前需要先初始化 QingStor 对象，初始化 QingStor 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

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

根据要创建的 Bucket 信息（Bucket Name, Zone）来初始化 Bucket。
Bucket Name 为用户申请的存储空间名称，命名规范:
- 遵守 DNS 命名规则。
- 长度在 6 ~ 63 之间。
- 只能包含 小写字母，数字和连接字符 -。
- 开头和结尾只能是小写字母或数字。
- 不能是有效 IP 地址。

Zone 为 Bucket 创建的区域，青云对象存储服务支持多区域部署。您可以在不同区域创建 Bucket。

```javascript
const bucket = qingstor.Bucket('create-bucket-name', 'zone-name');
```

bucket 对象创建完毕后，调用 put 方法在指定的 Zone 创建 Bucket。

```javascript
bucket.put().then(({ status }) => {
  // bucket 创建成功，status 应该为 201
  console.log(status);
}).catch((error) => {
  // bucket 创建失败，打印返回结果
  console.log(error.response.data);
});
```

### API 文档
创建一个存储空间 API 文档: [https://docs.qingcloud.com/qingstor/api/bucket/put.html](https://docs.qingcloud.com/qingstor/api/bucket/put.html)
