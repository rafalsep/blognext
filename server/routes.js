const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'blog', pattern: '/', page: 'blog' })
  .add({ name: 'articlePage', pattern: '/:articleName', page: 'articlePage' });
