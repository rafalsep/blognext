import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape } from 'prop-types';
import { Helmet } from 'react-helmet';
import { ANALYTICS_APP_ID, FACEBOOK_APP_ID } from 'common/env';
import { APP_URL } from 'constants/seo';
import { fetchArticles } from 'services/article-service';
import { FETCH_ARTICLES_RESPONDED } from 'events/article-events';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Articles from 'containers/Articles';
import 'styles/theme.scss';

class ArticlesPage extends PureComponent {
  static async getInitialProps({ store }) {
    const articles = await store.dispatch(fetchArticlesAction());
    return { articles };
  }

  render() {
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
          <title>GOOD dev - blog about programming best practices</title>
          <meta name="description" content="Good dev blog contains set of example based information how to build better software." />
          <link rel="alternate" href={APP_URL} hrefLang="en" />
          <link rel="canonical" href={APP_URL} />
          <meta property="og:url" content={APP_URL} />
          <meta property="og:site_name" content="GOOD dev" />
          <meta property="og:title" content="Good developer, best practices blog" />
          <meta property="og:description" content="Good dev blog is where developers can find information how to build a better software." />
          <meta property="og:image" content="static/images/gooddev-logo.png" />
          <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
          <meta name="google-analytics" content={ANALYTICS_APP_ID} />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Helmet>
        <Header />
        <main role="main">
          <Articles articles={this.props.articles} />
        </main>
        <Footer />
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  articles: arrayOf(shape({})).isRequired
};

function fetchArticlesAction() {
  return dispatch =>
    fetchArticles().then(articles => {
      dispatch({ type: FETCH_ARTICLES_RESPONDED, articles });
      return articles;
    });
}

// const mapStateToProps = (state) => {
//   return {
//     trendingArticles: state.blog.trendingArticles
//   }
// }

// const mapStateToProps = createStructuredSelector({
//   articles: state => { debugger; return state.blog; }
// });

export default ArticlesPage;
