# 从存储空间中批量删除指定对象

*此操作要求请求者对存储空间拥有可写权限。匿名用户无法使用批量删除的 API。*

## 准备工作

在删除对象之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用您的 AccessKeyID 和 SecretAccessKey 初始化 Qingstor 对象。

```javascript
import CryptoJS from 'crypto-js/md5';
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

bucket 对象创建完毕后，设置批量删除指定对象 deleteMultipleObjects 方法用到的参数。

```javascript
/**
 * @param options.objects - 需要删除的 objects 列表
 * @param options.quiet - 静默模式。如果为 true 则请求返回的结果中不会包含删除成功的对象列表。默认为 false。
 *
 * @return {Promise} axios response
 */

const options = {
  objects: [
    {
      key: "file_will_be_delete.jpg"
    },
    {
      key: "file_will_be_delete.zip"
    },
  ],
  quiet: false
};
```

请注意 DeleteMultipleObjectsInput 中的参数不是都必须设置的，具体可以参考[官方 API 文档](https://docs.qingcloud.com/qingstor/api/bucket/delete_multiple.html)。

最后调用 deleteMultipleObjects 从存储空间中批量删除指定对象。批量删除一次最多能删除 1000 个对象。

```javascript

bucket.deleteMultipleObjects(options).then((response) => {
  // 对象删除成功，status 应该为 200
  console.log(response.status);

  // 若 quiet 为 false 请求返回的结果中包含删除成功的对象列表
  console.log(response.data);
  // {
  //   deleted: [
  //     { key: 'file_will_be_delete.jpg' },
  //     { key: 'file_will_be_delete.zip' }
  //   ],
  //   errors: []
  // }
}).catch((error) => {
  // 对象删除失败，打印返回结果
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/delete_multiple/)
