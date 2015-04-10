var glyph = '\u261d',
  font_size = 48,
  font = font_size + 'px serif',
  fill = '#cc0000',

  glyph_origin_offset_x = -23.0,
  glyph_origin_offset_y = 11.0;

function _render(agent, ctx) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.translate(agent.x, agent.y);
  ctx.rotate(agent.r);
  ctx.fillText(glyph, glyph_origin_offset_x, glyph_origin_offset_y);
  ctx.restore();
}

function _renderAll(agentList, context) {
  for (var i = 0; i < agentList.length; i++) {
    _render(agentList[i], context);
  }
}

module.exports = {
  render: _render,

  renderAll: _renderAll

};