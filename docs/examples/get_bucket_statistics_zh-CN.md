# 获取 Bucket 使用统计

## 准备工作

在获取使用统计之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

## 代码片段

使用 Bucket 对象中的 `getStatistics` 方法获取使用统计:

```javascript
/**
 * Get statistics information of the bucket
 *
 * @return {Promise} axios response
 */
bucket.getStatistics().then((response) => {
  // {
  //   "count": 11,
  //   "status": "active",
  //   "name": "test-bucket-pek1",
  //   "created": "2017-10-10T06:31:49.000Z",
  //   "url": "https://test-bucket-pek1.pek3a.qingstor.com",
  //   "location": "pek3a",
  //   "storage_classes": {
  //      "STANDARD": {
  //          "size": 2062548,
  //          "billing_size": 2062548,
  //          "count": 11
  //      },
  //      "STANDARD_IA": {
  //          "size": 0,
  //          "billing_size": 0,
  //          "count": 0
  //      }
  //   },
  //   "size": 2062548
  // }
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

### API 文档

获取 Bucket 使用统计 API 文档: https://docs.qingcloud.com/qingstor/api/bucket/get_stats
