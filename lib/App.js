var World = require('./World'),
  RenderPipeline = require('./RenderPipeline'),
  Scenario = require('./Scenario');

require('./css/app.css');

module.exports = function (config) {
  var worldInstance, renderPipeline,

    mindTickCount = 0,
    renderTickCount = 0,

    mindIntervalId,
    renderIntervalId;

  config = config || {};

  this.init = function () {
    worldInstance = new World(config);
    renderPipeline = new RenderPipeline(config);

    worldInstance.setScenario(Scenario.random.spawn(worldInstance));
    renderPipeline.init();
  }

  this.start = function () {
    if (!renderIntervalId) {
      if (config.debug && console) {
        console.log('Started rendering thread.');
      }

      renderIntervalId = setInterval(function () {
        renderPipeline.captureWorldState(worldInstance);
        renderPipeline.renderCapturedState();

        renderTickCount++;
      }, 33);
    }

    if (!mindIntervalId) {
      mindIntervalId = setInterval(function() {
        var agentMinds = worldInstance.getScenario().getAgentMinds();
        for (var i = 0; i < agentMinds.length; i++) {
          agentMinds[i].tick();
        }

        mindTickCount++;
      }, 100);
    }
  }

  this.halt = function () {
    if (renderIntervalId) {
      if (config.debug && console) {
        console.log('Halted rendering thread, with %d RT and %d MT', renderTickCount, mindTickCount);
      }

      clearInterval(renderIntervalId);
      renderIntervalId = null;
    }

    if (mindIntervalId) {
      clearInterval(mindIntervalId);
      mindIntervalId = null;
    }
  }
};