import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UISelect extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    labelText: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  };

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
