/* eslint-disable react/no-unknown-property */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape } from 'prop-types';
import { Helmet } from 'react-helmet';
import { ANALYTICS_APP_ID, FACEBOOK_APP_ID } from 'common/env';
import { FETCH_ARTICLE_RESPONDED } from 'events/article-events';
import { APP_URL } from 'constants/seo';
import { imageUrlFor } from 'utils/imageLoader';
import { fetchArticle } from 'services/article-service';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { selectArticleName } from 'common/article-name-selector';
import Article from 'containers/Article/Article';
import 'styles/theme.scss';

class ArticlesPage extends PureComponent {
  static async getInitialProps({ store }) {
    const article = await store.dispatch(fetchArticleAction());
    return { article };
  }

  render() {
    const { article } = this.props;
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#3367D6" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="shortcut icon" href="static/images/favicon.ico" />
          <link rel="manifest" href="static/pwa/manifest.json" />
          <title>{article.title}</title>
          <meta name="description" content={article.teaser.replace(/\n/g, ' ')} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.teaser.replace(/\n/g, ' ')} />
          <meta
            property="og:image"
            content={imageUrlFor(article.image)
              .ignoreImageParams()
              .width(360)
              .height(252)
              .toString()}
          />
          <link rel="alternate" href={APP_URL} hrefLang="en" />
          <link rel="canonical" href={APP_URL} />
          <meta property="og:url" content={APP_URL} />
          <meta property="og:site_name" content="GOOD dev" />
          <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
          <meta name="google-analytics" content={ANALYTICS_APP_ID} />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Helmet>
        <Header />
        <main role="main">
          <Article article={article} />
        </main>
        <Footer />
      </div>
    );
  }
}

function fetchArticleAction() {
  return (dispatch, getState) =>
    fetchArticle(selectArticleName()(getState())).then(article => {
      dispatch({ type: FETCH_ARTICLE_RESPONDED, article });
      return article;
    });
}

export default ArticlesPage;
