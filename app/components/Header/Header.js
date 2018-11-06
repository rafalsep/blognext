import React, { memo } from 'react';
import Head from 'next/head';
import { ANALYTICS_APP_ID, FACEBOOK_APP_ID } from 'common/env';
import { Link } from '../../../routes';
import styles from './Header.scss';

const Header = () => (
  <header className="Header">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#3367D6" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta property="og:site_name" content="GOOD dev" />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta name="google-analytics" content={ANALYTICS_APP_ID} />
      <script async src="https://www.google-analytics.com/analytics.js" />
    </Head>
    <div className="header__top">
      <div className="header__logo">
        <Link route="index">
          <a>&lt; GOOD dev &gt; - blog about programming best practices</a>
        </Link>
      </div>
      <div className="header__quote">
        <blockquote className="quote">Adapt what is useful, reject what is useless, and add what is specifically your own.</blockquote>
      </div>
    </div>
    <style jsx>{styles}</style>
  </header>
);

export default memo(Header);
