import logger from 'loglevel';

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
  };
}
