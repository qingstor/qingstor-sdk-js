# Configuration Guide

## Summary

Except for AccessKeyID and SecretAccessKey, you can also configure the API servers for private cloud usage scenario. All available configureable items are list in default configuration file.

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

Config is just a dict with keys list upper.

### Code Snippet
Create default configuration

```javascript
var Config = require('qingstor-sdk').Config;
var defaultConfig = new Config().loadDefaultConfig();
```

Load user configuration

```javascript
var Config = require('qingstor-sdk').Config;
var userConfig = new Config().loadUserConfig();
```
