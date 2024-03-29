# 下载对象

## 准备工作

在下载对象之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。在 QingStor 对象初始化的时候您还应该设置 `responseType`。

- `json`
- `text`
- `blob` 仅浏览器环境支持
- `stream`
- `arraybuffer`

```javascript
import { QingStor, Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'YOUR-ACCESS-KEY-ID',
  secret_access_key: 'YOUR-SECRET-ACCESS-KEY',
  getAxiosConfig: function(operation) {
    return {
      // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'，默认 json
      responseType: 'arraybuffer',
      // 用于解码响应的编码，默认 utf8
      // Note: Ignored for `responseType` of 'stream' or client-side requests
      responseEncoding: 'binary',
    };
  },
});

const qingstor = new QingStor(config);
```

## 代码片段

使用 Bucket 对象中的 `getObject` 方法下载文件:

#### Node 环境

```javascript
import fs from 'fs';

/**
 * Retrieve the object
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.getObject(object_key).then((response) => {
  fs.writeFile(`./${object_key}`, response.data, {
    flag: 'wx',
    // 编码，默认 utf8
    encoding: 'binary',
  }, (error) => {
    console.log(error);
  });
}).catch((error) => {
  console.log(error);
});
```

#### 浏览器环境

在浏览器中访问 Bucket 子资源时，请为此 Bucker 设置相应的 CORS 规则，否则该请求将被阻止。

```javascript
const downloadArrayBuffer = (object_key, arraybuffer) => {
  const blob = new Blob([arraybuffer], { type: 'text/plain' });

  if ('download' in document.createElement('a')) {
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = object_key;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } else {
    window.navigator.msSaveBlob(blob, object_key);
  }
};

/**
 * Retrieve the object
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.getObject(object_key).then((response) => {
  downloadArrayBuffer(object_key, response.data);
}).catch((error) => {
  console.log(error);
});
```

#### `getObject` 方法参数说明

`getObject` 的第一个参数是文件在 Bucket 中的 key，不推荐直接使用文件名，因为可能会重名，推荐使用 `/` 作为 key 中的分隔符。

第二个参数是一个 Object，可选参数如下：

| 名称     | 类型     | 描述   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Match | `string` | 如果对象内容的 ETag 值符合给定的值，则正常下载对象，并返回 200 OK；否则返回 412 PRECONDITION FAILED。该值请使用 HTTP 规范所规定的格式。 |
| If-None-Match | `string` | 如果对象内容的 ETag 值不同于给定的值，则正常下载对象，并返回 200 OK；否则返回 304 NOT MODIFIED。  |
| If-Modified-Since | `Date` | 如果该对象自从指定时间往后被修改过，则正常下载对象，并返回 200 OK；否则返回 304 NOT MODIFIED。  |
| If-Unmodified-Since | `Date` | 如果该对象自从指定时间往后没有被修改过，则正常下载对象，并返回 200 OK；否则返回 412 PRECONDITION FAILED。 |
| Range | `string` | 下载对象的某个字节区间，详情可见：http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.35 当附加该请求头时，处理成功后返回的状态码为 206 Partial Content |
| X-QS-Encryption-Customer-Algorithm | `string` | 源对象的加密算法 。目前支持的加密算法是 AES256。 详情参考[这里](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)。|
| X-QS-Encryption-Customer-Key | `string` | 源对象的密钥。密钥必须进行 Base64 编码处理，对于AES256的密钥，明文必须具有32字节长度。详情参考[这里](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)。|
| X-QS-Encryption-Customer-Key-MD5 | `string` | 源对象的密钥的 MD5。密钥 MD5 必须进行 Base64 编码处理。 详情参考[这里](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/object/encryption/)。|
| response-cache-control | `string` | 设置响应头中的 Cache-Control 字段。 |
| response-content-disposition | `string` | 设置响应头中的 Content-Disposition 字段。若要支持指定浏览器下载的文件名中带中文，需要拼接参数 “?response-content-disposition=” + url_quote(‘attachment; filename=”‘+url_quote(filename) + “"; filename=*utf-8’’” + url_quote(filename))。 |
| response-content-encoding | `string` | 设置响应头中的 Content-Encoding 字段。 |
| response-content-language | `string` | 设置响应头中的 Content-Language 字段。 |
| response-content-type | `string` | 设置响应头中的 Content-Type 字段。 |
| response-expires | `string` | 设置响应头中的 Expires 字段。 |

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/get/)
