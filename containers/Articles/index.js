import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerGetInTouchClick } from './articles-actions';
import Articles from './Articles';

const mapDispatchToProps = dispatch => ({
  registerGetInTouchClick: website => dispatch(registerGetInTouchClick(website))
});

const mapStateToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Articles);
export { mapDispatchToProps };
