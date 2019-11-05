const axios = require('axios');

if (process.env.MINIPROGRAM) {
  const mpAdapter = require('axios-miniprogram-adapter');
  axios.defaults.adapter = mpAdapter.default;
}

module.exports = axios
