# 设置 Bucket CORS

## 准备工作

在设置 CORS 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.cors_rules - Bucket CORS rules
 *
 * @return {Promise} axios response
 */
bucket.putCORS({
  "cors_rules": [
    {
      "allowed_origin": "http://*.qingcloud.com",
      "allowed_methods": [
          "PUT",
          "GET",
          "DELETE",
          "POST"
      ],
      "allowed_headers": [
          "x-qs-date",
          "Content-Type",
          "Content-MD5",
          "Authorization"
      ],
      "max_age_seconds": 200,
      "expose_headers": [
          "x-qs-date"
      ]
    },
    {
      "allowed_origin": "http://*.example.com",
      "allowed_methods": [
          "PUT",
          "GET",
          "DELETE",
          "POST"
      ],
      "allowed_headers": [
          "*"
      ],
      "max_age_seconds": 400
    },
  ],
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cors/put_cors/)
