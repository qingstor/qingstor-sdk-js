function getDefaultConfig() {
  let adapter;

  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./node');
  } else {
    // For browsers use XHR adapter
    adapter = require('./browser');
  }

  return adapter;
}

module.exports = getDefaultConfig();
