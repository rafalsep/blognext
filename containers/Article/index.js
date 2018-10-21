import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectArticle } from 'common/article-selector';
import { fetchArticleAction } from './article-actions';
import Article from './Article';

const mapDispatchToProps = dispatch => ({
  fetchArticle: () => dispatch(fetchArticleAction())
});

const mapStateToProps = createStructuredSelector({
  article: selectArticle()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Article);
export { mapDispatchToProps };
