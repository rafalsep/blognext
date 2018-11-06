import React, { memo } from 'react';
import { func } from 'prop-types';
import Button from 'components/Button/index';
import { FacebookIcon, GooglePlusIcon } from 'react-share';
import { LOGIN_PROVIDER_FACEBOOK, LOGIN_PROVIDER_GOOGLE } from 'constants/login-providers';
import styles from './AddCommentLogin.scss';

const AddCommentLogin = ({ login }) => (
  <div className="add-comment__login">
    <div>Fill in your details below or click an icon to log in:</div>
    <div className="login__options">
      <div className="login__option">
        <Button type="button" className="button-icon" onClick={() => login(LOGIN_PROVIDER_FACEBOOK)}>
          <FacebookIcon size={25} />
        </Button>
      </div>
      <div className="login__option">
        <Button type="button" className="button-icon" onClick={() => login(LOGIN_PROVIDER_GOOGLE)}>
          <GooglePlusIcon size={25} />
        </Button>
      </div>
    </div>
    <style jsx>{styles}</style>
  </div>
);

AddCommentLogin.propTypes = {
  login: func.isRequired
};

export default memo(AddCommentLogin);
