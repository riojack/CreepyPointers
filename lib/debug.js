var $ = require('jquery'),

  debugEnabled = true;

module.exports = {
  log: {
    toHtml: function (selector, message) {
      $(selector).empty().append(message);
    },
    toConsole: function (message) {
      console.log(message);
    }
  }
}