import React, { PureComponent } from 'react';
import { func, shape, bool, oneOf } from 'prop-types';
import { FacebookIcon, GooglePlusIcon } from 'react-share';
import { LOGIN_PROVIDER_FACEBOOK, LOGIN_PROVIDER_GOOGLE } from 'constants/login-providers';
import LoggedInPanel from './LoggedInPanel';
import AddCommentLogin from './AddCommentLogin';
import AddCommentGuest from './AddCommentGuest';
import styles from './AddComment.scss';

export default class AddComment extends PureComponent {
  state = {
    showCommentExpandableSection: false,
    content: undefined,
    email: undefined,
    name: undefined,
    website: undefined
  };

  expandCommentDetails = () => {
    this.setState({ showCommentExpandableSection: true });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { addComment, comment, onAddComment } = this.props;
    const { content, name, email, website } = this.state;
    addComment(comment, { content, name, email, website });
    this.setState({ showCommentExpandableSection: false, content: undefined, email: undefined, name: undefined, website: undefined });
    onAddComment();
  };

  renderLoggedOutPanel() {
    return (
      <React.Fragment>
        <AddCommentLogin login={this.props.login} />
        <AddCommentGuest onValueChange={this.handleInputChange} />
      </React.Fragment>
    );
  }

  renderLoggedInPanel() {
    const loggedInIcon = this.props.loginProvider === LOGIN_PROVIDER_FACEBOOK ? <FacebookIcon size={25} /> : <GooglePlusIcon size={25} />;
    return <LoggedInPanel loggedInIcon={loggedInIcon} user={this.props.user} logout={this.props.logout} />;
  }

  renderExpandableSection() {
    return (
      <div>
        {this.props.loggedIn && this.renderLoggedInPanel()}
        {!this.props.loggedIn && this.renderLoggedOutPanel()}
      </div>
    );
  }

  render() {
    const { content, showCommentExpandableSection } = this.state;

    return (
      <div className="AddComment">
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="add-comment__input"
            name="content"
            maxLength="65525"
            required
            placeholder="Enter your comments here"
            value={content}
            onChange={this.handleInputChange}
            onFocus={this.expandCommentDetails}
          />
          {showCommentExpandableSection && this.renderExpandableSection()}
          {showCommentExpandableSection && (
            <div className="add-comment__form-submit">
              <input name="submit" type="submit" className="form-submit__input" value="Post Comment" />
            </div>
          )}
        </form>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

AddComment.propTypes = {
  addComment: func.isRequired,
  onAddComment: func,
  comment: shape({}),
  loggedIn: bool,
  user: shape({}),
  login: func.isRequired,
  logout: func.isRequired,
  loginProvider: oneOf([LOGIN_PROVIDER_FACEBOOK, LOGIN_PROVIDER_GOOGLE])
};

AddComment.defaultProps = {
  comment: undefined,
  onAddComment: () => {},
  loggedIn: false,
  user: undefined,
  loginProvider: undefined
};
