# 基本图片处理

## 准备工作

在处理图片之前需要先初始化 Bucket 对象，初始化 Bucket 对象的方法请参考[这里](./initialize_config_and_qingstor_zh-CN.md)。 在 QingStor 对象初始化的时候您还应该设置 `responseType`。

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
    return { responseType: 'arraybuffer' };
  },
});

const qingstor = new QingStor(config);
```

## 代码片段

使用 Bucket 对象中的 `imageProcess` 方法处理图片:

#### Node 环境

```javascript
import fs from 'fs';

/**
 * Image process with the action on the object
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.imageProcess(object_key, { action: 'rotate:a_90' }).then((response) => {
  console.log(response.status);

  fs.writeFile(`./${object_key}`, response.data, { flag: 'wx' }, (error) => {
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
 * Image process with the action on the object
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.imageProcess(object_key, { action: 'rotate:a_90' }).then((response) => {
  console.log(response.status);

  downloadArrayBuffer(object_key, response.data);
}).catch((error) => {
  console.log(error);
});
```

#### `imageProcess` 方法参数说明

`imageProcess` 的第一个参数是文件在 Bucket 中的 key，不推荐直接使用文件名，因为可能会重名，推荐使用 `/` 作为 key 中的分隔符。

第二个参数是一个 Object，Object 中的 `action` 参数表示对图片的一组操作:

- `action` 的格式为 `operation:k_v[,k_v][|operation:k_v][,k_v]`。
- `operation` 表示对图片的基本操作，如 [crop](https://docs.qingcloud.com/qingstor/data_process/image_process/crop)、 [rotate](https://docs.qingcloud.com/qingstor/data_process/image_process/rotate)、 [resize](https://docs.qingcloud.com/qingstor/data_process/image_process/resize)、 [watermark](https://docs.qingcloud.com/qingstor/data_process/image_process/watermark)、 [watermark image](https://docs.qingcloud.com/qingstor/data_process/image_process/watermark_image)、 [format](https://docs.qingcloud.com/qingstor/data_process/image_process/format)等。每个 operation 后面可以接多个 key value pair 作为参数。
- `k` 为 operation 的 argument key, `v` 为 argument value。
- 多个 operation 用分隔符 | 连接成为一个 action ，其将会顺序对图片进行操作，类似管道。

其他可选参数如下：

| 名称     | 类型     | 描述   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Modified-Since | `Date` | 如果该对象自从指定时间往后被修改过，则正常下载对象，并返回 200 OK；否则返回 304 NOT MODIFIED。  |
| response-cache-control | `string` | 设置响应头中的 Cache-Control 字段。 |
| response-content-disposition | `string` | 设置响应头中的 Content-Disposition 字段。若要支持指定浏览器下载的文件名中带中文，需要拼接参数 “?response-content-disposition=” + url_quote(‘attachment; filename=”‘+url_quote(filename) + “"; filename=*utf-8’’” + url_quote(filename))。 |
| response-content-encoding | `string` | 设置响应头中的 Content-Encoding 字段。 |
| response-content-language | `string` | 设置响应头中的 Content-Language 字段。 |
| response-content-type | `string` | 设置响应头中的 Content-Type 字段。 |
| response-expires | `string` | 设置响应头中的 Expires 字段。 |

更多信息，请参考 [API 文档](https://docsv3.qingcloud.com/storage/object-storage/api/object/image_process/)
