# 列取对象

## 准备工作

在列取对象之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。

## 代码片段

使用 Bucket 对象中的 `listObjects` 方法上传文件:

```javascript
/**
 * Retrieve the object list in a bucket
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.listObjects().then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

### `listObjects` 方法参数说明

| 名称 | 类型     | 描述 |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delimiter | `Char` | 是一个用于对 Object 名字进行分组的字符。所有名字包含指定的前缀且第一次出现 delimiter 字符之间的 object 作为一组元素。 |
| limit | `Integer` | 限定此次返回 object 的最大数量，默认值为 100，最大值 100。超出服务端限制之后我们仅会按照最大值处理。 |
| marker | `String` | 列取的游标, 应传入上一次 Response 返回的 next_marker 的值, 用户不应该自行构造或修改 marker 的内容 。 |
| prefix | `String` | 限定返回的 object key 必须以 prefix 作为前缀。 |

### 浏览器环境
在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/get/)
