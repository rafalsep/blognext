import React, { memo } from 'react';
import { shape, func, element } from 'prop-types';
import Button from 'components/Button/index';
import styles from './LoggedInPanel.scss';

const LoggedInPanel = ({ user, loggedInIcon, logout }) => (
  <div className="add-comment__loggedIn">
    <div className="loggedIn__avatar">
      <img alt="user avatar" width={30} height={30} src={user.picture} />
    </div>
    <div className="loggedIn__commentingAs">Commenting as</div>
    <div className="loggedIn__username">
      <strong>{user.name}</strong>
    </div>
    <div className="loggedIn__icon">{loggedInIcon}</div>
    <div className="loggedIn__logout">
      <Button type="button" className="button secondary small" onClick={logout}>
        Logout
      </Button>
    </div>
    <style jsx>{styles}</style>
  </div>
);

LoggedInPanel.propTypes = {
  user: shape({}).isRequired,
  loggedInIcon: element.isRequired,
  logout: func.isRequired
};

export default memo(LoggedInPanel);
