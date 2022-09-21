# DELETE Bucket Lifecycle

*Only the owner of the bucket is allowed to delete Lifecycle.*

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

After initialize a bucket object, call the deleteLifecycle method to delete Lifecycle.

```javascript
bucket.deleteLifecycle().then(({ status }) => {
  // Lifecycle has been deleted successfully, status should be 204.
  console.log(status);
}).catch((error) => {
  // Lifecycle delete failed, you can print error details.
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/lifecycle/delete_lifecycle/)
