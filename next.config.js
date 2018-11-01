const withSass = require('@zeit/next-sass');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  module.exports = withSass({
    webpack(config, { isServer, buildId, dev }) {
      const workboxOptions = {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['.next/static/*', '.next/static/commons/*'],
        modifyUrlPrefix: {
          '.next': '/_next'
        },
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst',
            options: {
              cacheName: 'html-cache'
            }
          },
          {
            urlPattern: /\/post/,
            handler: 'networkFirst',
            options: {
              cacheName: 'html-cache'
            }
          },
          {
            urlPattern: /api\.sanity\.io\/v1/,
            handler: 'networkFirst',
            options: {
              cacheName: 'api-cache',
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'image-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /.*\.(?:css)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'styles-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /.*\.(?:js)/,
            handler: 'networkFirst',
            options: {
              cacheName: 'resources-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      };

      if (!isServer && !dev) {
        config.plugins.push(
          new NextWorkboxPlugin({
            buildId,
            distDir: config.distDir,
            ...workboxOptions
          }),
          new WebpackPwaManifest({
            name: 'Good Developer',
            short_name: 'Good Developer',
            theme_color: '#3367D6',
            background_color: '#3367D6',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            filename: 'static/manifest.json',
            description: 'Good dev blog contains set of example based information how to build better software.',
            orientation: 'portrait',
            fingerprints: false,
            inject: false,
            ios: {
              'apple-mobile-web-app-title': 'Good Dev',
              'apple-mobile-web-app-status-bar-style': '#3367D6'
            },
            icons: [
              {
                src: path.resolve('static/favicon.ico'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: '/static'
              }
            ],
            includeDirectory: true,
            publicPath: '..'
          })
        );
      }

      return config;
    }
  });
} else {
  module.exports = withSass();
}
