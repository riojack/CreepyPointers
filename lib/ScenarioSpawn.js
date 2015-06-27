module.exports = function () {
  var agents = [], agentMinds = [];

  this.addAgent = function (agent) {
    agents.push(agent);
  }
  this.getAgents = function () {
    return agents;
  }

  this.addAgentMind = function (agentMind) {
    agentMinds.push(agentMind);
  }
  this.getAgentMinds = function () {
    return agentMinds;
  }
}
