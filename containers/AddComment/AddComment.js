/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import { func, shape, bool, oneOf } from 'prop-types';
import { FacebookIcon, GooglePlusIcon } from 'react-share';
import { LOGIN_PROVIDER_FACEBOOK, LOGIN_PROVIDER_GOOGLE } from 'constants/login-providers';
import './AddComment.scss';

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
        <div className="add-comment__login">
          <div>Fill in your details below or click an icon to log in:</div>
          <div className="login__options">
            <div className="login__option">
              <button type="button" className="button-icon" onClick={() => this.props.login(LOGIN_PROVIDER_FACEBOOK)}>
                <FacebookIcon size={25} />
              </button>
            </div>
            <div className="login__option">
              <button type="button" className="button-icon" onClick={() => this.props.login(LOGIN_PROVIDER_GOOGLE)}>
                <GooglePlusIcon size={25} />
              </button>
            </div>
          </div>
        </div>
        <div className="add-comment__expandable-section">
          <div>
            <label className="sticky">
              <input name="email" type="email" size="30" required maxLength="100" value={this.state.email} onChange={this.handleInputChange} />
              <label htmlFor="email">Email</label>
            </label>
          </div>
          <div>
            <label className="sticky">
              <input name="name" type="text" size="30" required maxLength="100" value={this.state.name} onChange={this.handleInputChange} />
              <label htmlFor="name">Name</label>
            </label>
          </div>
          <div>
            <label className="sticky">
              <input name="website" type="url" size="30" maxLength="200" value={this.state.website} onChange={this.handleInputChange} />
              <label htmlFor="website">Website (optional)</label>
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderLoggedInPanel() {
    const loggedInIcon = this.props.loginProvider === LOGIN_PROVIDER_FACEBOOK ? <FacebookIcon size={25} /> : <GooglePlusIcon size={25} />;

    return (
      <div className="add-comment__loggedIn">
        <div className="loggedIn__avatar">
          <img alt="user avatar" width={30} height={30} src={this.props.user.picture} />
        </div>
        <div className="loggedIn__commentingAs">Commenting as</div>
        <div className="loggedIn__username">
          <strong>{this.props.user.name}</strong>
        </div>
        <div className="loggedIn__icon">{loggedInIcon}</div>
        <div className="loggedIn__logout">
          <button type="button" className="button secondary small" onClick={this.props.logout}>
            Logout
          </button>
        </div>
      </div>
    );
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
