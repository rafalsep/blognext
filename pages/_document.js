import React from 'react';
import Document, { Main, NextScript, Head as NextHead } from 'next/document';
import Head from 'next/head';
import { ANALYTICS_APP_ID, FACEBOOK_APP_ID } from '../common/env';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#3367D6" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="shortcut icon" href="static/favicon.ico" />
          <link rel="manifest" href="manifest.json" />
          <meta property="og:site_name" content="GOOD dev" />
          <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
          <meta name="google-analytics" content={ANALYTICS_APP_ID} />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Head>
        <NextHead />
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
