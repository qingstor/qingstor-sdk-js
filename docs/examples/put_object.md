# Upload File

## Prepare

You need to initialize the Bucket object before uploading files to it. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.

## Code Snippet

Bucket has a method called `putObject` for uploading file:

```javascript
/**
 * Upload object to bucket
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 *
 * @return {Promise} axios response
 */
bucket.putObject('/path/to/some_object', {
  'content-type': 'text/html',
  body: file,
}).then((response) => {
  // If the upload is successful, the status code should be 201.
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});

```

### `putObject` Method Signature

The first parameter of `putObject` is the object key. It is not recommended to use the file name as the key of the object, as it may be duplicated. You can use `/` as the separator for key.

The second parameter is a Object, `body` is used to specifiy the file which will be uploaded to bucket. The avaliable types of `body` as follow:

- `string`
- `Blob` Browser only
- `Buffer` Node only
- `Stream` Node only

The type of a file in bucket is determined by the request `content-type` header. The default `content-type` is `application/octet-stream`. In browser environment, the `content-type` will set to the file's type if you omite it.

Other optional properties are as follow:

| Name               | Type     | Description                                                                                                                                                                                                          |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cache-control      | `string` | Specify directives for caching mechanisms in both requests and responses，such as `max-age=3600`. Refer to [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)                        |
| content-encoding   | `string` | Specify file encoding type, such as `gzip`.                                                                                                                                                                          |
| content-md5        | `string` | The MD5 value of the object used to check if the object has an error or was tampered with during transmission.                                                                                                       |
| content-type       | `string` | Specify file MIME type, such as `image/png`. Refer to [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)                                                                              |
| expect             | `string` | Indicates expectations that need to be fulfilled by the server in order to properly handle the request, such as `100-continue`. Refer to [MDN Doc](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect) |
| x-qs-storage-class | `string` | Specify the file storage class, includes STANDARD and STANDARD_IA.                                                                                                                                                   |

### API Doc

Put Object API: https://docs.qingcloud.com/qingstor/api/object/put
