# Image Processing

## Prepare

You need to initialize the Bucket object before. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket. You should set the `responseType` when QingStor is initialized.

- `json`
- `text`
- `blob` Browser only
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

## Code Snippet

Bucket has a method called `imageProcess` for processing image:

#### Node Environment

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

#### Browser Environment
Please set the corresponding CORS rule for this bucket when accessing the bucket subresource in a browser, otherwise the request will be blocked.

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

#### `imageProcess` Method Signature

The first parameter of `imageProcess` is the object key. It is not recommended to use the file name as the key of the object, as it may be duplicated. You can use `/` as the separator for key.

The second parameter is a Object, `action` is used to image process operations:

- `action` format is `operation:k_v[,k_v][|operation:k_v][,k_v]`.
- `operation` represents the basic operations on the image, such as [crop](https://docs.qingcloud.com/qingstor/data_process/image_process/crop), [rotate](https://docs.qingcloud.com/qingstor/data_process/image_process/rotate), [resize](https://docs.qingcloud.com/qingstor/data_process/image_process/resize), [watermark](https://docs.qingcloud.com/qingstor/data_process/image_process/watermark), [watermark image](https://docs.qingcloud.com/qingstor/data_process/image_process/watermark_image) and [format](https://docs.qingcloud.com/qingstor/data_process/image_process/format). Each operation can be followed by multiple key value pairs as parameters.
- `k` is operation's argument key, v is argument value.
- multiple operations use separators | joins into an action that will operate on the image sequentially, similar to a pipe.

Other optional properties are as follow:

| Name     | Type     | Description   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Modified-Since | `Date` | Check whether the object has been modified.  |
| response-cache-control | `string` | Specified the Cache-Control response header. |
| response-content-disposition | `string` | Specified the Content-Disposition response header. |
| response-content-encoding | `string` | Specified the Content-Encoding response header. |
| response-content-language | `string` | Specified the Content-Language response header. |
| response-content-type | `string` | Specified the Content-Type response header. |
| response-expires | `string` | Specified the Expires response header. |

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/image_process/)
