const next = require('next');
const express = require('express');
const compression = require('compression');
const routes = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  if (process.env.NODE_ENV === 'production') {
    express()
      .use(compression())
      .use(handler)
      .listen(3000);
  } else {
    express()
      .use(handler)
      .listen(3000);
  }
});
