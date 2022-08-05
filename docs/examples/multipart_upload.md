# Multipart Upload

## Prepare

You need to initialize the Bucket object before uploading files to it. Please refer to [here](./initialize_config_and_qingstor.md) about how to initialing a Bucket.


## Init Multipart Upload

Before using multipart upload, you need to initialize an object multipart upload, and QingStor object storage returns the unique Upload Id of the object multipart upload.

```javascript
/**
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Type - Object content type
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-MetaData - User-defined metadata
   * @param options.X-QS-Storage-Class - Specify the storage class for object
   *
   * @return {Promise} axios response
   */
bucket.initiateMultipartUpload('/path/to/some_object').then((response) => {
  // get the result in the following format
  // {
  //   bucket: <Bucket>,
  //   key: '/path/to/some_object',
  //   upload_id: <upload-ID>,
  // }
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```


## Segmenting large files

There are several limitations to using the Multipart upload method:

- Each segment can be up to 5GB.
- A multipart upload process uniquely identified by the Upload Id, which can support up to 10000 parts.
- With the exception of the last segment, which has an unlimited minimum length, the other segments have a minimum size of 4MB.
- The length of each fragment of an Object is not required to be the same.

The client can choose the segment size according to actual needs. For example, in the external network environment, since the transmission speed of the public network is determined by various factors, its size may be limited. Considering the interaction between the server and the client, QingStor object storage recommends that the client can use a smaller length to segment.

Segments can be of the following types:

- `string`
- `Blob` Browser only
- `Buffer` Node only
- `Stream` Node only

```javascript
import fs from 'fs';

const chunkSize = 64 * 1024 * 1024;
const file = fs.readFileSync('<FILE PATH>');
const maxChunk = Math.ceil(file.length / chunkSize);

let chunks = [];
for (let i = 0; i < maxChunk; i ++) {
  chunks[i] = file.slice(i * chunkSize, i * chunkSize + chunkSize);
}

//  [
//    <Buffer ... 67108814 more bytes>,
//    ...
//  ]
console.log(chunks);
```


## Multipart Upload

The file data is read in sequence according to the object content offset, and each segment is marked with an integer identifier greater than or equal to 0, and then uploadMultipart is called to complete the upload.

```javascript
chunks.map((chunk, index) => {
  /**
   * @param {string} object_key The object key
   * @param {Object} options - User input options;
   * @param options.Content-Length - Object multipart content length
   * @param options.Content-MD5 - Object multipart content MD5sum
   * @param options.X-QS-Copy-Range - Specify range of the source object
   * @param options.X-QS-Copy-Source - Copy source, format (/<bucket-name>/<object-key>)
   * @param options.X-QS-Copy-Source-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Copy-Source-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.X-QS-Copy-Source-If-Match - Check whether the Etag of copy source matches the specified value
   * @param options.X-QS-Copy-Source-If-Modified-Since - Check whether the copy source has been modified since the specified date
   * @param options.X-QS-Copy-Source-If-None-Match - Check whether the Etag of copy source does not matches the specified value
   * @param options.X-QS-Copy-Source-If-Unmodified-Since - Check whether the copy source has not been unmodified since the specified date
   * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
   * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
   * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
   * @param options.part_number - Object multipart upload part number
   * @param options.upload_id - Object multipart upload ID
   *
   * @return {Promise} axios response
   */
  bucket.uploadMultipart('/path/to/some_object', {
    body: chunk,
    upload_id: '<upload-ID>',
    part_number: index.toString(),
  }).then((response) => {
    // If the upload is successful, the status code should be 201.
    console.log(response.status);
  }).catch((error) => {
    console.log(error);
  });
});
```


## Complete Multipart Upload

This API is used to end a multipart upload to obtain a complete Object. When a multi-part upload is completed and the user does not call this interface, the multi-part upload is still in an incomplete state. At this time, calling a GET request to obtain the Object will return an error.

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.ETag - MD5sum of the object part
 * @param options.X-QS-Encryption-Customer-Algorithm - Encryption algorithm of the object
 * @param options.X-QS-Encryption-Customer-Key - Encryption key of the object
 * @param options.X-QS-Encryption-Customer-Key-MD5 - MD5sum of encryption key
 * @param options.upload_id - Object multipart upload ID
 * @param options.object_parts - Object parts
 *
 * @return {Promise} axios response
 */
bucket.completeMultipartUpload('/path/to/some_object', {
  upload_id: '<upload-ID>',
  object_parts: chunks.map((chunk, i) => {
    return { part_number: i };
  }),
}).then((response) => {
  // If the merge is successful, the obtained status should be 201
  console.log(response);
}).catch((error) => {
  console.log(error);
});
```


## Abort Multipart Upload

This API is used to terminate a multipart upload and delete already uploaded parts.

```javascript
/**
 * @param {string} object_key The object key
 * @param {Object} options - User input options;
 * @param options.upload_id - Object multipart upload ID
 *
 * @return {Promise} axios response
 */
bucket.abortMultipartUpload('/path/to/some_object', {
  upload_id: '<upload-ID>',
}).then((response) => {
  // If the cancellation is successful, the obtained status should be 204
  console.log(response.status);
}).catch((error) => {
  console.log(error);
});
```


### API Doc

Put Object API: https://docsv3.qingcloud.com/storage/object-storage/api/object/multipart/