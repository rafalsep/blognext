const next = require('next');
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const spdy = require('spdy');
const Cache = require('lru-cache');
const fs = require('fs');
const Router = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = Router.getRequestHandler(app);

const ssrCache = new Cache({
  max: 20, // not more than 20 results will be cached
  maxAge: 1000 * 60 * 5 // 5 mins
});

const options = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`)
};

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(compression({ level: 9 }));
  }

  server.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });

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

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url;

  // // if page is in cache, server from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // if something wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    ssrCache.set(key, html);
    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}
