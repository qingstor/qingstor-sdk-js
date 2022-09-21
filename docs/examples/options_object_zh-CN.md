# 检查 Object

当用户的请求属于跨源请求时，需要在正式通信前，增加一次 HTTP 的查询请求，询问服务器当前所在的源，是否在服务器的白名单中，以及哪些 HTTP 动作，头信息是其可以使用的。

该 API 接口便是用于向 QingStor 对象存储的 Object 发起预检请求，以确定是否能向该跨源请求发出回应。


## 准备工作

在检查 Object 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。


## 代码片段

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.Access-Control-Request-Headers - Request headers
 * @param options.Access-Control-Request-Method - Request method
 * @param options.Origin - Request origin
 *
 * @return {Promise} axios response
 */
bucket.optionsObject('<object-key>', {
  'Origin': 'example.com',
  'Access-Control-Request-Method': 'GET',
}).then((res) => {
  // {
  //   'access-control-max-age': '0',
  //   'access-control-allow-methods': 'GET',
  //   'access-control-allow-origin': '*',
  // }
  console.log(res.headers);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/options_object/)
