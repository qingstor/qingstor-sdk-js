import logger from 'loglevel';
import urlParse from 'urlparse';

export default function common(self) {
  return {
    checkConfig: () => {
      if (self.additional_user_agent) {
        self.additional_user_agent.split('').forEach((char) => {
          // Allow space(32) to ~(126) in ASCII Table, exclude "(34).
          if (char <= ' ' || char >= '~' || char === '"') {
            throw new RangeError(`additional_user_agent has not allowed value ${char}.`);
          }
        });
      }
    },

    loadConfig: (data) => {
      Object.assign(self, data);

      logger.setLevel(self.log_level);
      self.checkConfig();

      return self;
    },

    parseEndpoint: () => {
      if (!self.endpoint) {
        return self;
      }

      const { scheme: protocol, host, port = '' } = urlParse(self.endpoint);

      if (protocol && host) {
        Object.assign(self, { protocol, host, port });
      } else {
        // endpoint without protocol, for example qingstor.com
        Object.assign(self, { host: self.endpoint });
      }

      return self;
    }
  };
}
