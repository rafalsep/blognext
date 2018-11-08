/* eslint-disable react/no-unknown-property */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape } from 'prop-types';
import Head from 'next/head';
import { FETCH_ARTICLE_RESPONDED } from 'events/article-events';
import { APP_URL } from 'constants/seo';
import { imageUrlFor } from 'utils/imageLoader';
import { fetchArticle } from 'services/article-service';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { selectArticle } from 'common/article-selector';
import { registerPageLoadedAction } from 'common/analytics-actions';
import Article from 'containers/Article/Article';
import styles from './global-styles.scss';

class ArticlesPage extends PureComponent {
  static async getInitialProps({ store, isServer, query }) {
    const article = await store.dispatch(fetchArticleAction(query.slug));
    if (!isServer) {
      store.dispatch(registerPageLoadedAction(`/post/${article.slug.current}`, article.title));
    }
  }

  render() {
    const { article } = this.props;

    if (!article) {
      return null;
    }

    return (
      <div className="App">
        <Head>
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
          <link rel="alternate" href={`${APP_URL}post/${article.slug.current}`} hrefLang="en" />
          <link rel="canonical" href={`${APP_URL}post/${article.slug.current}`} />
          <meta property="og:url" content={`${APP_URL}post/${article.slug.current}`} />
        </Head>
        <Header />
        <main role="main">
          <Article article={article} />
        </main>
        <Footer />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  article: shape({})
};

ArticlesPage.defaultProps = {
  article: undefined
};

function fetchArticleAction(slug) {
  return dispatch =>
    fetchArticle(slug).then(article => {
      dispatch({ type: FETCH_ARTICLE_RESPONDED, article });
      return article;
    });
}

const mapStateToProps = createStructuredSelector({
  article: selectArticle()
});

export default connect(mapStateToProps)(ArticlesPage);
