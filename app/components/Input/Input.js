/* eslint-disable react/button-has-type,jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import { func, shape } from 'prop-types';
import styles from './Input.scss';

class Input extends PureComponent {
  state = {
    value: undefined
  };

  handleInputChange = event => {
    this.props.onValueChange(event);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <label className="Input">
        <input {...this.props.inputProps} value={this.state.value} onChange={this.handleInputChange} />
        <label htmlFor={this.props.inputProps.name}>{this.props.label}</label>
        <style jsx>{styles}</style>
      </label>
    );
  }
}

Input.propTypes = {
  onValueChange: func,
  inputProps: shape({}).isRequired
};

Input.defaultProps = {
  onValueChange: () => {}
};

export default Input;
