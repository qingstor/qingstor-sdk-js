# GET Object Download Url

## Code Snippet

Initialize the Qingstor Signer with your AccessKeyID and SecretAccessKey.

```javascript
import { Signer } from 'qingstor-sdk';

const signer = new Signer('YOUR-ACCESS-KEY-ID', 'YOUR--SECRET-ACCESS-KEY');
```

Then call the getQuerySignature method to get object download url. object_key Sets the filepath of the object to be fetched (in the current bucket).

```javascript
const { expires, signature, access_key_id } = signer.getQuerySignature({
  method: 'GET',
  expiresTTL: 300,
  path: object_key,
}); 

const bucketName = 'your-bucket-name';
const host = 'zone.qingstor.com';
const url = `https://${bucketName}.${host}/${object_key}?expires=${expires}&signature=${signature}&access_key_id=${access_key_id}`;

console.log(url);
```
