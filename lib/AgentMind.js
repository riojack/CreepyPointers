var _coll = require('lodash/collection'),
  _num = require('lodash/number'),
  _util = require('lodash/utility'),
  _obj = require('lodash/object'),
  AgentTasks = require('./AgentTasks'),
  TaskNames = _obj.invert(AgentTasks),

  toDegreesConversionFactor = Math.PI / 180.0,

  compassValues;

module.exports = function (config) {
  var agent,
    task,
    subTask,

    taskStart, taskEnd, taskIteration,

    tickCounter = 0,

  // trajectory when displacing (moving to point)
    direction, velocity, travelLength, // Direction = radians, and velocity = rate of change.

    currentDirectionToDestination;

  config = config || {};

  agent = config.agent;

  this.prime = function () {
    buildCompassValues();
    regenerateLookAroundTask();
  }

  this.tick = function () {
    tickCounter++;
    if (task === AgentTasks.LOOK_AROUND) {
      behaviorWhenLookAround();
    }
    else if (task === AgentTasks.IDLE) {
      behaviorWhenIdle();
    }
    else if (task === AgentTasks.MOVE_TO_POINT) {
      behaviorWhenMoveToPoint();
    }
  }

  // ====================================

  function buildCompassValues() {
    compassValues = _util.range(1.0, 360.0, 1.0);

    for (var i = 0; i < compassValues.length; i++) {
      compassValues[i] = compassValues[i] * toDegreesConversionFactor;
    }
  }

  function behaviorWhenMoveToPoint() {
    if (subTask === AgentTasks.SUB_TASKS.CALCULATE_DESTINATION) {
      direction = currentDirectionToDestination = agent.r;
      velocity = _num.random(1, 3);
      travelLength = _num.random(5, 25);
      subTask = AgentTasks.SUB_TASKS.DISPLACE_TO_DESTINATION;
    }
    else if (subTask === AgentTasks.SUB_TASKS.DISPLACE_TO_DESTINATION) {
      subTask = null;
      pickNextTask();
    }
  }

  function behaviorWhenIdle() {
    if (tickCounter >= taskEnd) {
      pickNextTask();
    }
  }

  function behaviorWhenLookAround() {
    var di = Math.abs(taskEnd - agent.r);

    if (di > 0.4) {
      agent.r += agent.rd;
    }
    else {
      pickNextTask();
      console.log(agent.name, '"I decided to:', TaskNames[task] + '"');
    }
  }

  function pickNextTask() {
    var nextTask = _coll.sample([
      primeForIdleDuration,
      primeForLookAround,
      moveToPoint
    ]);

    nextTask();
  }

  function resetDuration() {
    tickCounter = 0;
  }

  function primeForIdleDuration() {
    var idleDurationTicks = _num.random(5, 100);
    resetDuration();
    idleForDuration(idleDurationTicks);
  }

  function idleForDuration(duration) {
    task = AgentTasks.IDLE;
    taskStart = 0;
    taskEnd = duration;
  }

  function moveToPoint() {
    task = AgentTasks.MOVE_TO_POINT;
    subTask = AgentTasks.SUB_TASKS.CALCULATE_DESTINATION;
  }

  function primeForLookAround() {
    resetDuration();
    regenerateLookAroundTask();
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

};