"use strict";

var realFetch = require('node-fetch');
module.exports = function(url, options) {
  return realFetch.call(this, url, options);
};

if (!global.fetch) {
  global.fetch = module.exports;
  global.Response = realFetch.Response;
  global.Headers = realFetch.Headers;
  global.Request = realFetch.Request;
}
