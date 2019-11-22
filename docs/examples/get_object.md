# Get Object

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

Bucket has a method called `getObject` for downloading file:

#### Node Environment

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

#### `getObject` Method Signature

The first parameter of `getObject` is the object key. It is not recommended to use the file name as the key of the object, as it may be duplicated. You can use `/` as the separator for key.

The second parameter is a Object, optional properties are as follow:

| Name     | Type     | Description   |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If-Match | `string` | Check whether the ETag matches. |
| If-None-Match | `string` | Check whether the ETag does not match.  |
| If-Modified-Since | `Date` | Check whether the object has been modified.  |
| If-Unmodified-Since | `Date` | Check whether the object has not been modified. |
| Range | `string` | Specified range of the object |
| X-QS-Encryption-Customer-Algorithm | `string` | Encryption algorithm of the object. Refer to [Encryption Doc](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)|
| X-QS-Encryption-Customer-Key | `string` | Encryption key of the object. Refer to [Encryption Doc](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)|
| X-QS-Encryption-Customer-Key-MD5 | `string` | MD5sum of encryption key. Refer to [Encryption Doc](https://docs.qingcloud.com/qingstor/api/common/encryption.html#%E5%8A%A0%E5%AF%86%E8%AF%B7%E6%B1%82%E5%A4%B4)|
| response-cache-control | `string` | Specified the Cache-Control response header. |
| response-content-disposition | `string` | Specified the Content-Disposition response header. |
| response-content-encoding | `string` | Specified the Content-Encoding response header. |
| response-content-language | `string` | Specified the Content-Language response header. |
| response-content-type | `string` | Specified the Content-Type response header. |
| response-expires | `string` | Specified the Expires response header. |

### API Doc

Get Object API: https://docs.qingcloud.com/qingstor/api/object/get
