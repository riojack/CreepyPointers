var $ = require('jquery'),
  RenderAgent = require('./RenderAgent');

function setUpCanvas(config) {
  var canvas = config.document.createElement('canvas');
  canvas.setAttribute('height', ( config.canvasHeight || 250 ));
  canvas.setAttribute('width', ( config.canvasWidth || 250 ));

  canvas.setAttribute('class', ( config.canvasClasses || 'cnvs' ));

  return canvas;
}

module.exports = function (config) {
  var buffer_canvas, buffer_context, canvas, context, doc;

  config = config || {};

  if (!config.document) {
    throw 'Render Pipeline cannot continue because a document object was not found. Expected config.document to be specified.';
  }

  doc = config.document;

  this.init = function () {
    buffer_canvas = setUpCanvas(config);
    buffer_context = buffer_canvas.getContext('2d');

    canvas = setUpCanvas(config);
    $(config.attachSelector, doc).append(canvas);
    context = canvas.getContext('2d');
  };

  this.captureWorldState = function (worldInstance) {
    buffer_context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

    RenderAgent.renderAll(worldInstance.getScenario().getAgents(), buffer_context);
  };

  this.renderCapturedState = function () {
    context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

    context.drawImage(buffer_canvas, 0, 0);
  };
};