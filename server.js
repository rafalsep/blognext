const next = require('next');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const spdy = require('spdy');
const fs = require('fs');
const Router = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = Router.getRequestHandler(app);

const options = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`)
};

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(compression({ level: 9 }));
  }

  server.get('*', (req, res) => {
    if (req.url.includes('/service-worker')) {
      const filePath = join(__dirname, '.next', 'service-worker.js');
      app.serveStatic(req, res, filePath);
    } else if (req.url.includes('manifest')) {
      app.serveStatic(req, res, join(__dirname, '.next', 'static', 'manifest.json'));
    } else if (req.url.includes('/robots')) {
      app.serveStatic(req, res, join(__dirname, 'static', 'robots.txt'));
    } else {
      handler(req, res, req.url);
    }
  });

  server.use(handler);

  spdy.createServer(options, server).listen(3000, err => {
    if (err) throw err;
  });
});
