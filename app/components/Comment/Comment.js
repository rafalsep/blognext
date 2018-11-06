import React, { PureComponent } from 'react';
import { shape } from 'prop-types';
import dayjs from 'dayjs';
import AddComment from 'containers/AddComment/index';
import Button from 'components/Button/index';
import styles from './Comment.scss';

export default class Comment extends PureComponent {
  state = {
    showReplyForm: false
  };

  showReplyForm = () => {
    this.setState({ showReplyForm: true });
  };

  hideReplyForm = () => {
    this.setState({ showReplyForm: false });
  };

  render() {
    const { comment } = this.props;
    const { showReplyForm } = this.state;

    return (
      <article className="Comment">
        <footer className="comment__footer">
          <div className="comment__author">
            <img
              alt="avatar"
              src="https://0.gravatar.com/avatar/f734130d2be486763e433ed0bf4fb6ac?s=60&amp;d=https%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D96"
              className="author__avatar"
            />
            <b>{comment.name}</b>
          </div>
          <div className="comment__timestamp">
            <a disabled href="http://TODO/#comment-43756">
              <time dateTime={comment.createdAt}>{dayjs(comment.createdAt).format('dddd, MMMM D, YYYY H:mm')}</time>
            </a>
          </div>
        </footer>
        <div className="comment__body">
          <p className="comment__content">{comment.content}</p>
        </div>
        <div>
          <Button type="button" className="button comment__reply" onClick={this.showReplyForm}>
            reply
          </Button>
          {showReplyForm && <AddComment onAddComment={this.hideReplyForm} comment={comment} />}
        </div>
        <style jsx>{styles}</style>
      </article>
    );
  }
}

Comment.propTypes = {
  comment: shape({}).isRequired
};
