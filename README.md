# QingStor SDK for JavaScript
[![travis-ci](https://travis-ci.org/yunify/qingstor-sdk-js.svg?branch=master)](https://travis-ci.org/yunify/qingstor-sdk-js)
[![api-reference](https://img.shields.io/badge/api-reference-green.svg)](https://docs.qingcloud.com/qingstor)
[![license](https://img.shields.io/badge/license-apache%20v2-blue.svg)](https://github.com/yunify/qingstor-sdk-js/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/qingstor-sdk.png)](https://nodei.co/npm/qingstor-sdk/)

The official QingStor SDK for the JavaScript programming language.

## Installation

Install SDK into your project by NPM:

```bash
npm install qingstor-sdk
```

Alternatively, you can also use SDK by script tag. Go to the [release](https://github.com/yunify/qingstor-sdk-js/releases) page, download and save the SDK into you project, then in your HTML:

```html
<script src="https://example.com/path/to/qingstor-sdk-browser.min.js"></script>
<script>
  // reference sdk by a global variable: qingstor_sdk
  console.log(qingstor_sdk.version);
  console.log(qingstor_sdk.QingStor);
  console.log(qingstor_sdk.Config);
</script>
```

## Quick Started

### Preparation

Before your start, please go to [QingCloud Console](https://console.qingcloud.com/access_keys/) to create a pair of QingCloud API AccessKey.

*API AccessKey Example:*

```yaml
access_key_id: 'ACCESS_KEY_ID_EXAMPLE'
secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE'
```

### Usage

```javascript
import { QingStor, Config, version } from 'qingstor-sdk';

const config = new Config('ACCESS_KEY_ID_EXAMPLE', 'SECRET_ACCESS_KEY_EXAMPLE');
const bucket = new QingStor(config).Bucket('example_bucket', 'pek3a');

// list objects under perfix '/images'
bucket.listObjects({
  limit: 10,
  prefix: '/images',
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});
```

QingStor SDK use [axios](https://github.com/axios/axios) as the HTTP client, all the methods of `QingStor` and `Bucket` will return a axios instance, which is a Promise, if your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

Now you are ready to code. You can read the detailed guides in the list below to have a clear understanding or just take the quick start code example.

Checkout our [releases](https://github.com/yunify/qingstor-sdk-js/releases) and [change logs](CHANGELOG.md) for information about the latest features, bug fixes and new ideas.

- [Configuration Guide](docs/configuration.md)
- [QingStor Service Usage Guide](docs/qingstor_service_usage.md)

## Reference Documentations

- [QingStor Documentation](https://docs.qingcloud.com/qingstor/index.html)
- [QingStor Guide](https://docs.qingcloud.com/qingstor/guide/index.html)
- [QingStor APIs](https://docs.qingcloud.com/qingstor/api/index.html)

## Contributing

Please see [Contributing Guidelines](docs/contributing.md) of this project before submitting patches.

## LICENSE

The Apache License (Version 2.0, January 2004).
