/* eslint-disable react/no-unknown-property */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { shape } from 'prop-types';
import { FETCH_ARTICLE_RESPONDED } from 'events/article-events';
import { APP_URL } from 'constants/seo';
import { imageUrlFor } from 'utils/imageLoader';
import { fetchArticle } from 'services/article-service';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { selectArticleName } from 'common/article-name-selector';
import { selectArticle } from 'common/article-selector';
import Article from 'containers/Article';
import Head from 'next/head';
import 'styles/theme.scss';

class ArticlesPage extends PureComponent {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchArticleAction());
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

function fetchArticleAction() {
  return (dispatch, getState) =>
    fetchArticle(selectArticleName()(getState())).then(article => {
      dispatch({ type: FETCH_ARTICLE_RESPONDED, article });
      return article;
    });
}

const mapStateToProps = createStructuredSelector({
  article: selectArticle()
});

export default connect(mapStateToProps)(ArticlesPage);
