# Delete a Object

*Delete a Object need caller have READ Permission of Bucket*
>If the Bucket is set to be READ to an anonymous user, the request does not need to carry authentication information. If the authentication information is carried, but the authenticated user does not have the READ permission of the Bucket, requesting the interface will return a permission error.

## Code Snippet

Initialize the Qingstor object with your AccessKeyID and SecretAccessKey.

```javascript
import { QingStor, Config } from 'qingstor-sdk';

// Initialize the config object first.
const config = new Config({
  access_key_id: "YOUR-ACCESS-KEY-ID",
  secret_access_key: "YOUR--SECRET-ACCESS-KEY",
});

// If you use the SDK in browser environment, we strongly recommend deploying a signature server that is specifically used to sign requests, so the access_key_id and secret_access_key will not exposing to the client. Node environment not support signature server for now.
const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});

const qingstor = new QingStor(config);
```

Initialize a Bucket object according to the bucket info (Bucket name, Zone) you set for subsequent operation.

```javascript
const bucket = qingstor.Bucket('your-bucket-name', 'zone-name');
```

After the bucket initialize, you need to create the parameters used by the deleteObject method.
Then call deleteObject to remove the specified object from the Bucket.

```javascript
const objectKey = "file_your_want_delete";

bucket.deleteObject(objectKey).then(({ status }) => {
  // Object has been deleted successfully, status should be 204.
  console.log(status);
}).catch((error) => {
  // Object delete failed, you can print error details.
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/object/basic_opt/delete/)
