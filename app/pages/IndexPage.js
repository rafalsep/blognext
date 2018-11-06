import React, { PureComponent } from 'react';
import { shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { APP_URL } from 'constants/seo';
import { fetchArticles } from 'services/article-service';
import { FETCH_ARTICLES_RESPONDED } from 'events/article-events';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Articles from 'containers/Articles';
import { registerPageLoadedAction } from 'common/analytics-actions';
import { selectArticles } from 'common/article-selector';
import { createStructuredSelector } from 'reselect';
import styles from './global-styles.scss';

const TITLE = 'GOOD dev - blog about programming best practices';

class IndexPage extends PureComponent {
  static async getInitialProps({ store, isServer }) {
    await store.dispatch(fetchArticlesAction());
    if (!isServer) {
      store.dispatch(registerPageLoadedAction('/', TITLE));
    }
  }

  render() {
    return (
      <div className="App">
        <Head>
          <title>{TITLE}</title>
          <meta name="description" content="Good dev blog contains set of example based information how to build better software." />
          <link rel="alternate" href={APP_URL} hrefLang="en" />
          <link rel="canonical" href={APP_URL} />
          <meta property="og:url" content={APP_URL} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content="Good dev blog is where developers can find information how to build a better software." />
          <meta property="og:image" content="static/gooddev-logo.png" />
        </Head>
        <Header />
        <main role="main">
          <Articles articles={this.props.articles} />
        </main>
        <Footer />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

IndexPage.propTypes = {
  articles: arrayOf(shape({})).isRequired
};

function fetchArticlesAction() {
  return dispatch =>
    fetchArticles().then(articles => {
      dispatch({ type: FETCH_ARTICLES_RESPONDED, articles });
      return articles;
    });
}

const mapStateToProps = createStructuredSelector({
  articles: selectArticles()
});

export default connect(mapStateToProps)(IndexPage);
