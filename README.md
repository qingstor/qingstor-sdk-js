# QingStor SDK for JavaScript
[![travis-ci](https://travis-ci.org/yunify/qingstor-sdk-js.svg?branch=master)](https://travis-ci.org/yunify/qingstor-sdk-js)
[![api-reference](https://img.shields.io/badge/api-reference-green.svg)](https://docs.qingcloud.com/qingstor)
[![license](https://img.shields.io/badge/license-apache%20v2-blue.svg)](https://github.com/yunify/qingstor-sdk-js/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/qingstor-sdk.png)](https://nodei.co/npm/qingstor-sdk/)

The official QingStor SDK for the JavaScript programming language.

## Getting Started

### Installation

Refer to the [Installation Guide](docs/installation.md), and have this SDK installed.

### Preparation

Before your start, please go to [QingCloud Console](https://console.qingcloud.com/access_keys/) to create a pair of QingCloud API AccessKey.

*API AccessKey Example:*

```bash
access_key_id: 'ACCESS_KEY_ID_EXAMPLE'
secret_access_key: 'SECRET_ACCESS_KEY_EXAMPLE'
```

### Usage

Now you are ready to code. You can read the detailed guides in the list below to have a clear understanding or just take the quick start code example.
Checkout our releases and change logs for information about the latest features, bug fixes and new ideas.


*Quick Start Code Example:*
```javascript
"use strict";

var Qingstor = require('qingstor-sdk').QingStor;
var example_config = require('qingstor-sdk').Config.loadUserConfig();
var example = new Qingstor(example_config).Bucket('example_bucket', 'pek3a');
test.listObjects({}, function (err, res, data) {
    console.log(data);
    console.log(res.statusCode);
})
```

## Reference Documentations

- [QingStor Documentation](https://docs.qingcloud.com/qingstor/index.html)
- [QingStor Guide](https://docs.qingcloud.com/qingstor/guide/index.html)
- [QingStor APIs](https://docs.qingcloud.com/qingstor/api/index.html)

## Contributing

This repository was automatically generated, please contribute to [snips](https://github.com/yunify/snips) instead.

## LICENSE

The Apache License (Version 2.0, January 2004).
