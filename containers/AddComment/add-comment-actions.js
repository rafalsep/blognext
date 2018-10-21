/* eslint-disable no-underscore-dangle */
import { appendComment, addNewComment, addNewReply, appendReply } from 'services/comments-service';
import moment from 'moment';
import { ADD_COMMENT_RESPONDED } from 'events/comment-events';
import { USER_LOGGED_OUT, USER_LOGIN_REQUESTED } from 'events/login-events';
import { LOGIN_PROVIDER_FACEBOOK, LOGIN_PROVIDER_GOOGLE } from 'constants/login-providers';
import { selectArticle } from 'common/article-selector';

export function addCommentAction(comment, commentForm) {
  return (dispatch, getState) => {
    const selectedArticle = selectArticle()(getState());

    if (!comment) {
      if (!selectedArticle.comments) {
        return addNewComment(selectedArticle._id, { ...commentForm, createdAt: moment.utc().format() }).then(response => {
          dispatch({ type: ADD_COMMENT_RESPONDED, updatedArticle: response });
        });
      }
      return appendComment(selectedArticle._id, { ...commentForm, createdAt: moment.utc().format() }).then(response => {
        dispatch({ type: ADD_COMMENT_RESPONDED, updatedArticle: response });
      });
    }

    const commentHaveReply = selectedArticle.comments.some(
      selectedArticleComment => (selectedArticleComment._key === comment._key ? selectedArticleComment.replies !== undefined : commentHaveReplies(comment._key, selectedArticleComment))
    );
    if (!commentHaveReply) {
      return addNewReply(selectedArticle._id, comment._key, { ...commentForm, createdAt: moment.utc().format() }).then(response => {
        dispatch({ type: ADD_COMMENT_RESPONDED, updatedArticle: response });
      });
    }
    return appendReply(selectedArticle._id, comment._key, { ...commentForm, createdAt: moment.utc().format() }).then(response => {
      dispatch({ type: ADD_COMMENT_RESPONDED, updatedArticle: response });
    });
  };
}

function commentHaveReplies(searchKey, comment) {
  return (
    comment.replies &&
    comment.replies.some(reply => {
      if (reply._key === searchKey) {
        return reply.replies !== undefined;
      }
      return commentHaveReplies(searchKey, reply);
    })
  );
}

export function login(loginProvider) {
  return dispatch => {
    if (loginProvider === LOGIN_PROVIDER_FACEBOOK) {
      FB.login(() => {}, { scope: 'public_profile,email' });
      dispatch({ type: USER_LOGIN_REQUESTED });
    }
    if (loginProvider === LOGIN_PROVIDER_GOOGLE) {
      gapi.auth2.getAuthInstance().signIn();
      dispatch({ type: USER_LOGIN_REQUESTED });
    }
  };
}

export function logout() {
  return (dispatch, getState) => {
    const loginProvider = getState().getIn(['login', 'loginProvider']);
    if (loginProvider === LOGIN_PROVIDER_FACEBOOK) {
      FB.logout(() => {
        dispatch({ type: USER_LOGGED_OUT });
      });
    }
    if (loginProvider === LOGIN_PROVIDER_GOOGLE) {
      gapi.auth2.getAuthInstance().signOut();
      dispatch({ type: USER_LOGGED_OUT });
    }
  };
}
