# Delete MultipleObjects

*Delete MultipleObjects need caller have READ Permission of Bucket. Anonymous users is not allowed to Delete MultipleObjects*

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

Then set the input parameters used by the deleteMultipleObjects method. Quiet Specifies whether to return a list of deleted objects.

```javascript
/**
 * @param options.objects - A list of keys to delete
 * @param options.quiet - It will not return the list of deleted objects if quiet set true, default is false.
 *
 * @return {Promise} axios response
 */

const options = {
  quiet: false,
  objects: [
    {
      key: "file_will_be_delete.jpg"
    },
    {
      key: "file_will_be_delete.zip"
    },
  ],
};
```

Please note that not all fields in deleteMultipleObjects required to be set. For details, please refer to [Official API Documentation](https://docsv4.qingcloud.com/user_guide/storage/object_storage/api/bucket/basic_opt/delete_multiple/).

Then call the deleteMultipleObjects method to delete the object. objectKey Sets the filepath of the object to be deleted (in the current bucket).

```javascript
bucket.deleteMultipleObjects(options).then(({ status }) => {
  // Bucket has been deleted successfully, status should be 200.
  console.log(status);

  // If quiet set false, it will return the list of deleted objects.
  console.log(response.data);
  // {
  //   deleted: [
  //     { key: 'file_will_be_delete.jpg' },
  //     { key: 'file_will_be_delete.zip' }
  //   ],
  //   errors: []
  // }
}).catch((error) => {
  // Bucket delete failed, you can print error details.
  console.log(error.response.data);
});
```

For more information, please refer to our [API documentation](https://docsv3.qingcloud.com/storage/object-storage/api/bucket/basic_opt/delete_multiple/)
