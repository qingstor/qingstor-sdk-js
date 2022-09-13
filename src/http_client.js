const axios = require('axios');

if (typeof process !== 'undefined' && process.env.MINIPROGRAM) {
  const mpAdapter = require('axios-miniprogram-adapter');
  axios.defaults.adapter = mpAdapter.default;
}

module.exports = axios;
