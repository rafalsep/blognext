/* eslint-disable import/no-extraneous-dependencies */
const withOffline = require('next-offline');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const styledJsx = require('styled-jsx/webpack');

if (process.env.NODE_ENV === 'production') {
  module.exports = withOffline({
    webpack(config, { isServer, dev, defaultLoaders }) {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          defaultLoaders.babel,
          {
            loader: styledJsx.loader,
            options: {
              type: 'global'
            }
          }
        ]
      });
      if (!isServer && !dev) {
        config.plugins.push(
          new WebpackPwaManifest({
            name: 'Good Developer',
            short_name: 'Good Dev',
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
    },
    workboxOpts: {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/server/*', '_next/server/*', '_next/server/*'],
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
          urlPattern: /https:\/\/klyyehyz.api.sanity.io\/v1\/data\/query/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: /.*\.css/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'styles-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /.*\.(?:jpg|png|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  });
} else {
  module.exports = {
    webpack: (config, { defaultLoaders }) => {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          defaultLoaders.babel,
          {
            loader: styledJsx.loader,
            options: {
              type: 'global'
            }
          }
        ]
      });

      return config;
    }
  };
}
