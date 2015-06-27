var Hapi = require('hapi'),

  server = new Hapi.Server({debug: {request: ['error']}});

server.connection({port: 3000});

server.route({
  method: 'GET',
  path: '/js/{p*}',
  handler: {
    directory: {
      path: './dist'
    }
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './example'
    }
  }
});

server.start(function () {
  console.log('Server running at: ', server.info.uri);
});
