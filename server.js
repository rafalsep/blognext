const next = require('next');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const spdy = require('spdy');
const fs = require('fs');
const routes = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

const options = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`)
};

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    if (req.url.includes('/sw')) {
      const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
      app.serveStatic(req, res, filePath);
    } else if (req.url.includes('/manifest')) {
      app.serveStatic(req, res, join(__dirname, 'static', 'manifest.json'));
    } else if (req.url.includes('/robots')) {
      app.serveStatic(req, res, join(__dirname, 'static', 'robots.txt'));
    } else if (req.url.startsWith('static/workbox/')) {
      app.serveStatic(req, res, join(__dirname, req.url));
    } else {
      handler(req, res, req.url);
    }
  });

  server.use(handler);

  if (process.env.NODE_ENV === 'production') {
    server.use(compression());
  }

  spdy.createServer(options, server).listen(3000, err => {
    if (err) throw err;
  });
});
