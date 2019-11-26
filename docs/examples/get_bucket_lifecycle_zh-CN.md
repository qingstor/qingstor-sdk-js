# 获取 Bucket 生命周期

## 准备工作

在获取生命周期之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor.md)。

## 代码片段

使用 Bucket 对象中的 `getLifecycle` 方法获取生命周期:

```javascript
/**
 * Get Lifecycle information of the bucket
 *
 * @return {Promise} axios response
 */
bucket.getLifecycle().then((response) => {
  // {"rule":[]}
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

### API 文档

获取 Bucket 生命周期 API 文档: https://docs.qingcloud.com/qingstor/api/bucket/lifecycle/get_lifecycle
