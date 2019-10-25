function getDefaultConfig() {
  let adapter;

  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./config-for-node');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./config-for-browser');
  }

  return adapter;
}

module.exports = getDefaultConfig();
