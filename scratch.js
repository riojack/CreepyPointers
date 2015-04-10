var canvas = document.getElementById('m'),
  ctx = canvas.getContext('2d'),

  rotate_radians = Math.PI/2.5,
  glyph_origin_offset_x = -23.0,
  glyph_origin_offset_y = 11.0,
  font_size = 48,
  font_size_half = (font_size / 2.0),

  glyph_x = font_size_half + glyph_origin_offset_x,
  glyph_y = font_size_half + glyph_origin_offset_y,

  dot_x = 100.0,
  dot_y = 100.0;

ctx.save();
ctx.font = font_size + 'px serif';
ctx.fillStyle = '#cc0000';
ctx.translate(dot_x, dot_y);
ctx.rotate(rotate_radians);
ctx.fillText('\u261d', glyph_origin_offset_x, glyph_origin_offset_y);
ctx.restore();

ctx.save();
ctx.fillStyle = '#00ff00';
ctx.arc(dot_x, dot_y, 4.0, 0.0, (2.0 * Math.PI), false);
ctx.fill();
ctx.restore();