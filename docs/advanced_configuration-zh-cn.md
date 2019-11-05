# Config 模块配置

在构造 Config 对象时，构造函数支持传一个 Object 参数，具体内容为:

```javascript
{
  // 发送签名是需要使用这两个 key 对请求签名
  // 请前往 [青云控制台 Console](https://console.qingcloud.com/access_keys/) 创建和下载
  access_key_id: 'your_ak',
  secret_access_key: 'your_sk',

  // 在浏览器或者其他客户端环境使用 SDK 时，建议部署签名服务器，由签名服务器来为请求签名
  // 这样的好处是不会将 access_key_id 和 secret_access_key 暴露在客户端
  // 签名服务器的代码非常简单，请参考[这里的 Express 示例](./examples/signaure_server.js)
  signature_server: 'https://your.signatureserver.com',

  // 对象存储服务地址，默认如下
  host: 'qingstor.com',
  port: 443,
  protocol: 'https',

  // 设置 SDK 输出日志的级别，默认为警告
  // Valid levels are "debug", "info", "warn", "error", and "fatal"
  log_level: 'warn',

  // 请求对象存储时，请求 header 中的 User-Agent 字段
  // 此设置只在 Node 环境中有效
  additional_user_agent: 'your_ua_string',

  // SDK 使用 axios 作为 HTTP Client，在向对象存储发请求前可以对 axios 做一些额外的配置
  // 例如可以指定 responseType、onUploadProgress/onDownloadProgress 事件回调等
  // axios 具体支持的配置请参考: https://github.com/axios/axios#request-config
  getAxiosConfig: function(operation) {
    return {
      responseType: 'stream',
    }
  },
}
```
