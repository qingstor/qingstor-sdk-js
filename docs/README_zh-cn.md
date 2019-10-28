# QingStor 对象存储 JavaScript SDK

- [安装](#安装)
- [快速开始](#快速开始)
- [请求返回格式说明](#请求返回格式说明)
- [SDK 完整功能列表以及参数说明](./api_specification.md)
- [SDK 使用示例列表](./examples)
- [Config 自定义设置](./advanced_configuration-zh-cn.md)

## 安装

使用 npm 或者 [yarn](https://yarnpkg.com) 安装 SDK

```bash
npm install qingstor-sdk

# or
yarn add qingstor-sdk
```

你也可以直接使用 script 标签的方式引入 SDK，请前往 [release](https://github.com/yunify/qingstor-sdk-js/releases) 页面下载打包好的 SDK 文件，然后在 HTML 中加上如下格式的 script 标签:

```html
<script src="https://example.com/path/to/qingstor-sdk.js"></script>
<script>
  // reference sdk by a global variable: qingstor_sdk
  console.log(qingstor_sdk.version);
  console.log(qingstor_sdk.QingStor);
  console.log(qingstor_sdk.Config);
</script>
```
我们建议你在开发时使用未压缩的版本，好处是方便调试，在生产环境中再使用 `qingstor-sdk.min.js` 版本

## 快速开始

QingStor SDK 使用 ES6 的语法编写，所以使用前请确保你配置了合适的构建环境。

### 浏览器环境

如果你是在浏览器中使用 SDK，推荐使用 [Babel](https://babeljs.io) 对代码进行编译，使用 [Webpack](https://webpack.js.org) 打包代码。

1. 首先安装 Babel:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

2. 安装完成之后在项目的根目录下新建一个 `babel.config.js` 文件，其中文件内容如下:

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

3. 安装 webpack:

```bash
npm install --save-dev webpack webpack-cli
```

4. 安装完成之后在项目的根目录下新建一个 `webpack.config.js` 文件，其中文件内容如下:

```javascript
module.exports = {
  mode: 'development',

  // 项目的启动文件, 你可以在这里 import { QingStor } from 'qingstor-sdk'
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

之后就可以在 terminal 中输入 `./node_module/.bin/webpack -w` 来开发了，关于 Babel 和 Webpack 配置与使用的更多细节，请参考其官方文档。

### Node 环境

如果你是在 Node 环境中使用 SDK，推荐使用 [esm](https://github.com/standard-things/esm) 来作为 module loader。

1. 安装 esm:

```bash
npm install esm
```

2. 使用 esm:

```bash
node -r esm index.js
```

### Access Key 和 Secret Key

发往 QingStor 对象存储的请求需要使用 Access Key 和 Secret Key 对请求签名，请前往 [青云控制台 Console](https://console.qingcloud.com/access_keys/) 创建和下载。下载到的密钥文件格式如下，请妥善保存你的密钥:

```
access_key_id: 'ACCESS_KEY_ID_EXAMPLE'
secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE'
```

### 获取 Bucket 列表

在项目中根目录下新建一个 `index.js` 文件，复制以下内容到文件中:

```javascript
// index.js

import { QingStor, Config } from 'qingstor-sdk';

// 修改这里的 ACCESS_KEY_ID_EXAMPLE 和 SECRET_ACCESS_KEY_EXAMPLE 为前
// 一步中得到的 access_key_id 和 secret_access_key
const config = new Config('ACCESS_KEY_ID_EXAMPLE', 'SECRET_ACCESS_KEY_EXAMPLE');
const qingstor = new QingStor(config);

function listBuckets() {
  qingstor.listBuckets().then((response) => {
    console.log(response.data);
    // 得到如下格式的结果
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

### 新建 Bucket

```javascript

import { QingStor, Config } from 'qingstor-sdk';

// 修改这里的 ACCESS_KEY_ID_EXAMPLE 和 SECRET_ACCESS_KEY_EXAMPLE 为前
// 一步中得到的 access_key_id 和 secret_access_key
const config = new Config('ACCESS_KEY_ID_EXAMPLE', 'SECRET_ACCESS_KEY_EXAMPLE');
const qingstor = new QingStor(config);

function createBucket() {
  qingstor.Bucket('example-bucket', 'sh1a').put().then(({ status }) => {
    // bucket 创建成功，status 应该为 201
    console.log(status);
  }).catch((error) => {
    // bucket 创建失败，打印返回结果
    console.log(error.response.data);
  });
}

createBucket();

```

### 获取 Bucket 中的文件列表

```javascript

import { QingStor, Config } from 'qingstor-sdk';

// 修改这里的 ACCESS_KEY_ID_EXAMPLE 和 SECRET_ACCESS_KEY_EXAMPLE 为前
// 一步中得到的 access_key_id 和 secret_access_key
const config = new Config('ACCESS_KEY_ID_EXAMPLE', 'SECRET_ACCESS_KEY_EXAMPLE');
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

## 请求返回格式说明

QingStor SDK 使用 [axios](https://github.com/axios/axios) 作为 http 客户端，所有请求的返回都是一个 Promise。axios 的 response 结构如下:

```js
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

## 参考文档

- [QingStor Documentation](https://docs.qingcloud.com/qingstor/index.html)
- [QingStor Guide](https://docs.qingcloud.com/qingstor/guide/index.html)
- [QingStor APIs](https://docs.qingcloud.com/qingstor/api/index.html)

## Contributing

Please see [Contributing Guidelines](https://github.com/yunify/qingstor-sdk-js/blob/master/docs/contributing.md) of this project before submitting patches.

## LICENSE

The Apache License (Version 2.0, January 2004).
