const next = require('next');
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

  server

    // Next.js Route
    .get('*', (req, res) => handler(req, res));

  spdy
    .createServer(
      options,
      express()
        .use(handler)
        .use(compression())
    )
    .listen(3000, err => {
      if (err) throw err;
    });

  // spdy.createServer(options, app.use(handler)).listen(3000, error => {
  //   if (error) {
  //     console.error(error);
  //     return process.exit(1);
  //   }
  // });

  // if (process.env.NODE_ENV === 'production') {
  //   express()
  //     .use(compression())
  //     .use(handler)
  //     .listen(80);
  // } else {
  //   express()
  //     .use(handler)
  //     .listen(3000);
  // }
});
