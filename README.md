# QingStor SDK for JavaScript
[![travis-ci](https://travis-ci.org/yunify/qingstor-sdk-js.svg?branch=master)](https://travis-ci.org/yunify/qingstor-sdk-js)
[![api-reference](https://img.shields.io/badge/api-reference-green.svg)](https://docs.qingcloud.com/qingstor)
[![license](https://img.shields.io/badge/license-apache%20v2-blue.svg)](https://github.com/yunify/qingstor-sdk-js/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/qingstor-sdk.png)](https://nodei.co/npm/qingstor-sdk/)

The official QingStor SDK for the JavaScript programming language.

[中文文档](https://github.com/yunify/qingstor-sdk-js/blob/master/docs/README_zh-cn.md)

- [Install](#install)
- [Quick Start](#quick-start)
- [Response format](#response-format)
- [SDK API Specification](./docs/api_specification.md)
- [SDK Usage Examples](./docs/examples/index.md)
- [Config Custom Settings](./docs/advanced_configuration-zh-cn.md)

### Break Changes in 3.0.0

- Config should be initialized like this: `const config = new Config({ access_key_id, secret_access_key })`

## Install

Use npm or [yarn](https://yarnpkg.com) to install SDK

```bash
npm install qingstor-sdk

# or
yarn add qingstor-sdk
```

Alternatively, you can also use SDK by script tag. Go to the [release](https://github.com/yunify/qingstor-sdk-js/releases) page, download and save the SDK into you project, then in your HTML:

```html
<script src="https://example.com/path/to/qingstor-sdk.js"></script>
<script>
  // reference sdk by a global variable: qingstor_sdk
  console.log(qingstor_sdk.version);
  console.log(qingstor_sdk.QingStor);
  console.log(qingstor_sdk.Config);
</script>
```

We recommend using the uncompressed version during development for debugging purposes. Use the `qingstor-sdk.min.js` in production environment.

## Quick Start

QingStor JS SDK is written in ES6 syntax, so make sure you have the right build environment before using it.

### Browser Environment

If you are using the SDK in browser, it is recommended to compile the code using [Babel](https://babeljs.io) and package the code using [Webpack](https://webpack.js.org).

1. install Babel firstly:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

2. then create file `babel.config.js` in the root folder of your project with the following content:

```javascript
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```

3. install webpack:

```bash
npm install --save-dev webpack webpack-cli
```

4. create the file `webpack.config.js` in the root folder of project, copy and paste code below:

```javascript
module.exports = {
  mode: 'development',

  // you can import { QingStor } from 'qingstor-sdk' in this file
  entry: './index.js',

  output: {
    filename: 'dist.js',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```

open your terminal and input `./node_module/.bin/webpack -w` for developing. For more details on the configuration and use of Babel and Webpack, please refer to its official documentation.

### Node Environment

If you are using the SDK in a Node environment, it is recommended to use [esm](https://github.com/standard-things/esm) as the module loader.

1. install esm:

```bash
npm install esm
```

2. use esm:

```bash
node -r esm index.js
```

### Request Signature

Requests sent to the QingStor must be signed by Access Key and Secret Key. Please go to the [QingCloud Console] (https://console.qingcloud.com/access_keys/) to create and download them. The downloaded key file format is as follows, please save your key properly.

```
access_key_id: 'ACCESS_KEY_ID_EXAMPLE'
secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE'
```

If you use the SDK in the Node environment, you can initialize the Config object as follow:

```
import { Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});
```

If you use the SDK in browser environment, we strongly recommend deploying a signature server that is specifically used to sign requests, so the access_key_id and secret_access_key will not exposing to the client.

The code for the signature server is very simple, please refer to the [Express Example] (./docs/examples/signaure_server.js). After the signature server is deployed, initialize the Config object as follows:

```javascript
import { Config } from 'qingstor-sdk';

const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});
```

Note: If the signature server uses a different domain from user's, you need to configure the corresponding [CORS] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rule.

### Get Bucket list

create a file call `index.js` with following content:

```javascript
// index.js

import { QingStor, Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});
// or
const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});

const qingstor = new QingStor(config);

function listBuckets() {
  qingstor.listBuckets().then((response) => {
    console.log(response.data);
    // output as follow
    // {
    //   "count": 2,
    //   "buckets": [
    //     {
    //       "name": "mybucket",
    //       "location": "pek3a",
    //       "url": "https://mybucket.pek3a.qingstor.com",
    //       "created": "2015-07-11T04:45:57Z"
    //     },
    //     {
    //       "name": "myphotos",
    //       "location": "pek3a",
    //       "url": "https://myphotos.pek3a.qingstor.com",
    //       "created": "2015-07-12T09:40:32Z"
    //     }
    //   ]
    // }
  });
}

listBuckets();

```

### Create Bucket

```javascript

import { QingStor, Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});
// or
const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});

const qingstor = new QingStor(config);

function createBucket() {
  qingstor.Bucket('example-bucket', 'sh1a').put().then(({ status }) => {
    // bucket create succeed, status should be 201
    console.log(status);
  }).catch((error) => {
    // bucket create failed
    console.log(error.response.data);
  });
}

createBucket();

```

### Get object list in a Bucket

```javascript

import { QingStor, Config } from 'qingstor-sdk';

const config = new Config({
  access_key_id: 'ACCESS_KEY_ID_EXAMPLE',
  secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE',
});
// or
const config = new Config({
  signature_server: 'https://your.signserver.com/some_path',
});

const bucket = new QingStor(config).Bucket('example-bucket', 'sh1a');

function listObjects() {
  // list objects under perfix '/images'
  bucket.listObjects({
    limit: 10,
    prefix: '/images',
  }).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error.response.data);
  });
}

listObjects();

```

## Response format

QingStor SDK uses [axios] (https://github.com/axios/axios) as http client, and all requests are returned as a Promise. The response structure of axios is as follows:

```javascript
// copied from https://github.com/axios/axios/blob/master/README.md
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

## Reference Documentations

- [QingStor Documentation](https://docs.qingcloud.com/qingstor/index.html)
- [QingStor Guide](https://docs.qingcloud.com/qingstor/guide/index.html)
- [QingStor APIs](https://docs.qingcloud.com/qingstor/api/index.html)

## Contributing

Please see [Contributing Guidelines](docs/contributing.md) of this project before submitting patches.

## LICENSE

The Apache License (Version 2.0, January 2004).
