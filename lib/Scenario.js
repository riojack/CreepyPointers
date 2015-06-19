var _num = require('lodash/number'),
  _util = require('lodash/utility'),
  Agent = require('./Agent'),
  AgentMind = require('./AgentMind'),

  Meta = require('./Meta'),

  ScenarioSpawn = require('./ScenarioSpawn'),

  twicePi = Math.PI * 2.0;

module.exports = {
  random: {
    spawn: function (worldInstance) {
      var agentCount = _num.random(3, 5),
        worldProps = worldInstance.getProperties(),

        xspace = (worldProps.boundaries.x1 - worldProps.boundaries.x0) / agentCount,
        yspace = (worldProps.boundaries.y1 - worldProps.boundaries.y0) / agentCount,

        nxspace = 75.0,
        nyspace = 75.0,

        scenarioSpawn = new ScenarioSpawn();

      _util.times(agentCount, function (n) {
        var agent = new Agent(),
          agentMind = new AgentMind({agent: agent, worldProps: worldProps});

        agent.id = 100 + n;
        agent.name = 'Agent ' + n;

        agent.color = Meta.random.colorHash();

        agent.x = nxspace;
        agent.y = nyspace;

        agent.r = _num.random(0.0, twicePi);

        nxspace += xspace;
        nyspace += yspace;

        agentMind.prime();

        scenarioSpawn.addAgent(agent);
        scenarioSpawn.addAgentMind(agentMind);
      });

      return scenarioSpawn;
    }
  }
}