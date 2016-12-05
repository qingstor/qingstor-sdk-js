# Configuration Guide

## Summary

This SDK uses a structure called "Config" to store and manage configuration, read comments of public functions in ["config.js"](https://github.com/yunify/qingstor-sdk-js/blob/master/lib/config.js) for details.

Except for Access Key, you can also configure the API endpoint for private cloud usage scenario. All available configurable items are listed in the default configuration file.

*Default Configuration File:*

```
# QingStor Services Configuration

access_key_id: ''
secret_access_key: ''

host: 'qingstor.com'
port: 443
protocol: 'https'
connection_retries: 3

# Valid levels are "debug", "info", "warn", "error", and "fatal".
log_level: 'warn'
```

## Usage

Just create a config structure instance with your API Access Key.

### Code Snippet

Create default configuration

``` javascript
var Config = require('qingstor-sdk').Config;
var defaultConfig = new Config().loadDefaultConfig();
```

Create configuration from Access Key

``` javascript
var Config = require('qingstor-sdk').Config;
var userConfig = new Config().loadDefaultConfig();
userConfig.access_key_id = "ACCESS_KEY_ID";
userConfig.secret_access_key = "SECRET_ACCESS_KEY";
```

Load user configuration

``` javascript
var Config = require('qingstor-sdk').Config;
var userConfig = new Config().loadUserConfig();
```

Load configuration from config file

``` javascript
var Config = require('qingstor-sdk').Config;
var userConfig = new Config().loadUserConfig('PATH/TO/FILE');
```

Change API endpoint

``` javascript
var Config = require('qingstor-sdk').Config;
var moreConfiguration = new Config().loadDefaultConfig();

moreConfiguration.protocol = "https";
moreConfiguration.host = "api.private.com";
moreConfiguration.port = 4433;
```