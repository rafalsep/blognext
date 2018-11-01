const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'index', pattern: '/', page: 'index' })
  .add({ name: 'articlePage', pattern: '/post/:articleName', page: 'articlePage' });
