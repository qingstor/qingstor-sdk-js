# SDK 初始化

## 初始化 Config 对象

发往 QingStor 对象存储的请求需要使用 Access Key 和 Secret Key 对请求签名，请前往 [青云控制台 Console](https://console.qingcloud.com/access_keys/) 创建和下载。下载到的密钥文件格式如下，请妥善保存你的密钥:

```
access_key_id: 'ACCESS_KEY_ID_EXAMPLE'
secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE'
```

如果在 Node.js 环境中使用 SDK，在初始化配置 Config 对象时，可以直接采用如下方式:

```
import { Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});
```

如果在浏览器 Browser 环境中使用 SDK，我们强烈建议部署一个签名服务器，专门用来对请求做签名，这样的好处是不会将 access_key_id 和 secret_access_key 暴露在客户端。

签名服务器的代码非常简单，请参考[这里的 Express 示例](./examples/signaure_server.js)。签名服务器部署好之后，请采用如下方式初始化 Config 对象:

```javascript
import { Config } from 'qingstor-sdk';

const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});
```

Config 对象还支持设置打印的日志级别等配置，更多详情请参考[这里](../advanced_configuration-zh-cn.md)。

## 初始化 QingStor 对象

QingStor 对象用于列出用户所有的 Bucket 和初始化某个 Bucket 对象，使用初始化好的 Config 对象初始化 QingStor 对象:

```javascript
import { Config, QingStor } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});

const qingstor = new QingStor(config);

// 获取 Bucket 列表
qingstor.listBuckets().then((response) => {
  console.log(response.data);
  // 得到如下格式的结果
  // {
  //   "count": 2,
  //   "buckets": [
  //     {
  //       "name": "mybucket",
  //       "location": "pek3a",
  //       "url": "https://mybucket.pek3a.qingstor.com",
  //       "created": "2015-07-11T04:45:57Z"
  //     },
  //     {
  //       "name": "myphotos",
  //       "location": "pek3a",
  //       "url": "https://myphotos.pek3a.qingstor.com",
  //       "created": "2015-07-12T09:40:32Z"
  //     }
  //   ]
  // }
});
```

### 初始化 Bucket 对象

上传和下载文件等操作都需要使用 Bucket 对象中的方法，通过调用 QingStor 对象中的 `Bucket` 方法可以得到, 此方法需要传递 Bucket 的名称的 zone ID，例如:

```javascript
const bucket = qingstor.Bucket('example-bucket', 'sh1a');

// list objects under perfix '/images'
bucket.listObjects({
  limit: 10,
  prefix: '/images',
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error.response.data);
});
```
