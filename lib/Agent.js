var _obj = require('lodash/object'),
  spatial = require('./partials/spatial2D'),
  ident = require('./partials/identifier');

function K_Agent() {
  this.color = '#cc0000';
  return;
}

_obj.extend(K_Agent.prototype, spatial, ident);

module.exports = K_Agent;