import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchTrendingArticlesAction } from './trending-articles-actions';
import TrendingArticles from './TrendingArticles';

const mapDispatchToProps = dispatch => ({
  fetchTrendingArticles: () => dispatch(fetchTrendingArticlesAction())
});

const mapStateToProps = state => ({
  trendingArticles: state.blog.trendingArticles
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TrendingArticles);
