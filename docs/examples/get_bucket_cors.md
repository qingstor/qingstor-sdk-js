# GET Bucket CORS

*Only the owner of the bucket is allowed to get CORS.*

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

After initialize a bucket object, call the getCORS method to get Bucket CORS.

```javascript
bucket.getCORS().then((response) => {
  // Get CORS successfully. It will return the list of CORS.
  console.log(response.data.cors_rules);
  // cors example
  // [
  //   {
  //     "allowed_origin": "http://*.example.com",
  //     "allowed_methods": [
  //       "PUT",
  //       "GET",
  //       "DELETE",
  //       "POST"
  //     ],
  //     "allowed_headers": [
  //       "*"
  //     ],
  //     "max_age_seconds": 400
  //   }
  // ]
  console.log(response.data.cors_rules);
}).catch((error) => {
  // Bucket delete failed, you can print error details.
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/cors/get_cors/)
