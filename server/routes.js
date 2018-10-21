const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'blog', pattern: '/', page: 'blog' })
  .add({ name: 'articleDetails', pattern: '/:articleName', page: 'articleDetails' });
