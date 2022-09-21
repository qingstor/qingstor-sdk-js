# 设置 Bucket ACL

## 准备工作

在设置 ACL 之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

```javascript
/**
 * @param {Object} options - User input options;
 * @param options.acl - Bucket ACL rules
 *
 * @return {Promise} axios response
 */
bucket.putACL({
  acl: [
    {
      "grantee": {
        "type": "group",
        "name": "QS_ALL_USERS"
      },
      "permission": "READ"
    }
  ],
}).then((response) => {
  // status == 200
  console.log(response.status);
}).catch((error) => {
  console.log(error.response.data);
});
```

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/acl/put_acl/)
