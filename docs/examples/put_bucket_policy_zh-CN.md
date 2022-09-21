# 设置 Bucket 存储空间策略

## 准备工作

在设置 存储空间策略 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.statement - Bucket policy statement
 *
 * @return {Promise} axios response
 */
bucket.putPolicy({
  "statement": [
    {
      "id": "allow certain site to get objects",
      "user": "*",
      "action": ["get_object"],
      "effect": "allow",
      "resource": ["<bucket>/*"],
      "condition": {
        "string_like": {
          "Referer": [
            "*.example1.com",
            "*.example2.com"
          ]
        }
      }
    },
  ]
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/policy/put_policy/)
