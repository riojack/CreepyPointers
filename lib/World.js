var _lang = require('lodash/lang');

module.exports = function (config) {
  var scenarioSpawn, properties;

  config = config || {};

  properties = {
    boundaries: {
      x0: 0,
      y0: 0,
      x1: config.worldWidth || 250.0,
      y1: config.worldHeight || 250.0
    }
  };

  if (config.debug && console) {
    console.log('World started :: x0,y0', properties.boundaries.x0, properties.boundaries.y0, 'x1,y1', properties.boundaries.x1, properties.boundaries.y1);
  }

  this.getProperties = function () {
    return _lang.cloneDeep(properties);
  }

  this.setScenario = function (scenarioSpwn) {
    scenarioSpawn = scenarioSpwn;
  }

  this.getScenario = function () {
    return scenarioSpawn
  }
};
