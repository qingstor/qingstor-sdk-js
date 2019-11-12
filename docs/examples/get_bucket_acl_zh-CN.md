# 获取存储空间的访问控制列表 (Access Control List)

*Access Control List 只有存储空间的所有者才能获取。*

## 准备工作

在获取 Access Control List 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

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

bucket 对象创建完毕后，调用 getACL 方法获取 Bucket ACL。

```javascript
bucket.getACL().then((response) => {
  // 获取成功，返回 ACL 列表
  console.log(response.data.acl);
  // [
  //   {
  //     grantee :{
  //       type: "user",
  //       id: "usr-xxx",
  //       name: "qingcloud"
  //     },
  //     permission: "FULL_CONTROL"
  //   }
  // ]
}).catch((error) => {
  // 获取失败，打印返回结果
  console.log(error.response.data);
});
```

### API 文档
获取 ACL API 文档: [https://docs.qingcloud.com/qingstor/api/bucket/acl/get_acl.html](https://docs.qingcloud.com/qingstor/api/bucket/acl/get_acl.html)
