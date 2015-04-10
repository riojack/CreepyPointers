var _coll = require('lodash/collection'),
  _num = require('lodash/number'),
  AgentTasks = require('./AgentTasks');

module.exports = function (config) {
  var agent, worldProps, task, taskStart, taskEnd, taskTickDuration = 0;

  config = config || {};

  agent = config.agent;
  worldProps = config.worldProps;

  this.prime = function () {
    regenerateLookAroundTask();
  }

  this.tick = function () {
    taskTickDuration++;
    if (task === AgentTasks.LOOK_AROUND) {
      var di = Math.abs(taskEnd - agent.r);

      if (di > 0.4) {
        agent.r += agent.rd;
      }
      else {
        var idleDurationTicks = _num.random(5, 100);
        resetDuration();
        idleForDuration(idleDurationTicks);
      }
    }
    else if (task === AgentTasks.IDLE) {
      if (taskTickDuration >= taskEnd) {
        resetDuration();
        regenerateLookAroundTask();
      }
    }
  }

  // ====================================

  function resetDuration() {
    taskTickDuration = 0;
  }

  function idleForDuration(duration) {
    task = AgentTasks.IDLE;
    taskStart = 0;
    taskEnd = duration;
  }

  function regenerateLookAroundTask() {
    var rotate_delta_denom = _coll.sample([15.0, 30.0, 45.0, 90.0]),
      rotate_delta = Math.PI / rotate_delta_denom,
      direction = _coll.sample([rotate_delta, -rotate_delta]),
      rotation_multiplier = _num.random(0.2, 12.0, true);

    agent.rd = direction;
    task = AgentTasks.LOOK_AROUND;
    taskStart = agent.r;
    taskEnd = agent.r + (rotation_multiplier * agent.rd);
  }

}