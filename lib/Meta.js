var _num = require('lodash/number');

module.exports = {
  random: {
    colorHash: function () {
      var r = _num.random(10, 245).toString(16),
        g = _num.random(10, 245).toString(16),
        b = _num.random(10, 245).toString(16);

      return '#' + r + g + b;
    }
  }
}