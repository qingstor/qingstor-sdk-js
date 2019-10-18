# Configuration Guide

## Summary

This SDK uses a structure called "Config" to store and manage configuration, read comments of public functions in ["config.js"](https://github.com/yunify/qingstor-sdk-js/src/config/node.js) for details.

Except for Access Key, you can also configure the API endpoint for private cloud usage scenario. All available configurable items are listed in the default configuration file.

*Default Configuration File:*

```yaml
# QingStor Services Configuration

access_key_id: ''
secret_access_key: ''

host: 'qingstor.com'
port: 443
protocol: 'https'
connection_retries: 3

# Additional User-Agent, Node.js only
additional_user_agent: ""
# Valid levels are "debug", "info", "warn", "error", and "fatal".
log_level: 'warn'
```

## Code Snippet

**Create configuration from Access Key:**

browser

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-browser';

const config = new Config("ACCESS_KEY_ID", "SECRET_ACCESS_KEY");
```

Node.js

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-node';

const config = new Config("ACCESS_KEY_ID", "SECRET_ACCESS_KEY");
```

**Load current user default configuration:**

Node.js

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-node';

const config = new Config().loadDefaultConfig();
config.access_key_id = "ACCESS_KEY_ID";
config.secret_access_key = "SECRET_ACCESS_KEY";
```

**Create default configuration:**

Node.js

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-node';

// a yaml config file will be created at ~/.qingstor/config
const config = new Config().installDefaultUserConfig();
```

**Load configuration from config file:**

Node.js

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-node';

const config = new Config().loadConfigFromFilepath('PATH/TO/FILE');
```

**Change API endpoint:**

browser

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-browser';

const config = new Config("ACCESS_KEY_ID", "SECRET_ACCESS_KEY");
config.loadConfig({
  protocol: 'https',
  host: 'api.private.com',
  port: 4433,
});
```

Node.js

```javascript
import { Config } from 'qingstor-sdk/dist/qingstor-sdk-node';

const config = new Config("ACCESS_KEY_ID", "SECRET_ACCESS_KEY");
config.loadConfig({
  protocol: https,
  host: api.private.com,
  port: 4433,
  additional_user_agent: 'UserExample',
});
```
