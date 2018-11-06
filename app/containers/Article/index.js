import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectArticle } from 'common/article-selector';
import Article from './Article';

const mapDispatchToProps = () => ({});

const mapStateToProps = createStructuredSelector({
  article: selectArticle()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Article);
