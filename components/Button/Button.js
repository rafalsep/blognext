/* eslint-disable react/button-has-type */
import React, { memo } from 'react';
import { string, func, node } from 'prop-types';
import styles from './Button.scss';

const Button = ({ type, children, className, onClick }) => (
  <React.Fragment>
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
    <style jsx>{styles}</style>
  </React.Fragment>
);

Button.propTypes = {
  type: string,
  children: node.isRequired,
  className: string,
  onClick: func
};

Button.defaultProps = {
  type: 'button',
  className: 'button',
  onClick: undefined
};

export default memo(Button);
