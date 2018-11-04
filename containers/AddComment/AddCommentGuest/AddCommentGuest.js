import React, { memo } from 'react';
import { func } from 'prop-types';
import Input from 'components/Input';
import styles from './AddCommentGuest.scss';

const AddCommentGuest = ({ onValueChange }) => (
  <div className="add-comment__expandable-section">
    <div>
      <Input inputProps={{ name: 'email', type: 'email', size: '30', required: 'required', maxLength: '100' }} label="Email" onValueChange={onValueChange} />
    </div>
    <div>
      <Input inputProps={{ name: 'name', type: 'text', size: '30', required: 'required', maxLength: '100' }} label="Name" onValueChange={onValueChange} />
    </div>
    <div>
      <Input inputProps={{ name: 'website', type: 'url', size: '30', maxLength: '200' }} label="Website (optional)" onValueChange={onValueChange} />
    </div>
    <style jsx>{styles}</style>
  </div>
);

AddCommentGuest.propTypes = {
  onValueChange: func.isRequired
};

export default memo(AddCommentGuest);
