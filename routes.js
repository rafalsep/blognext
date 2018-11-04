const Router = require('nextjs-dynamic-routes');

const router = new Router();
router.add({ name: 'index', pattern: '/' });
router.add({ name: 'articlePage', pattern: '/post/:articleName' });

module.exports = router;
