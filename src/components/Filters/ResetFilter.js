import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResetFilter extends Component {
  static propTypes = {
    onResetFilters: PropTypes.func.isRequired,
  };

  render() {
    const { onResetFilters } = this.props;

    return (
      <button type="button" className="btn btn-danger" onClick={onResetFilters}>
        Сбросить фильтры
      </button>
    );
  }
}
