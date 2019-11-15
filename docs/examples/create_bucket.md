# Create a Bucket

*After bucket created successfully, the owner of bucket will be the API caller.*

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

Initialize a Bucket object according to the bucket info (Bucket name, Zone) you set for subsequent creation.
Bucket Name is you requested storage space name, the rule of Bucket Name naming is:
- Follow DNS naming rules
- Length of name should between 6 and 63
- Only contain lowercase letters, numbers and connection characters -
- Start and end can only be lowercase letters or numbers
- Cannot be a valid IP address

Zone will be the location of Bucket，QingStor supports multi-zone deployment. You can create Buckets in different areas.

```javascript
const bucket = qingstor.Bucket('your-bucket-name', 'zone-name');
```

After initialize a bucket object, call the put method to create a Bucket in the specified zone.

```javascript
bucket.put().then(({ status }) => {
  // bucket has been created successfully, status should be 201.
  console.log(status);
}).catch((error) => {
  // bucket creation failed, you can print error details.
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docs.qingcloud.com/qingstor/api/bucket/put.html).