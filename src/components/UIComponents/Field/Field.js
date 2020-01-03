import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Field = props => {
  const {
    labelText,
    type,
    placeholder,
    name,
    value,
    onChange,
    id,
    error,
    onBlur,
  } = props;

  const getClassName = error =>
    classNames('form-control', {
      invalid: error,
    });

  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        className={getClassName(error)}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.any,
};

export default Field;
