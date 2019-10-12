import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends Component {
  static propTypes = {
    primary_release_year: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  yearsRange = () => {
    var list = [];
    for (var year = 1950; year <= new Date().getFullYear(); year++) {
      list.push({
        label: year,
        value: year,
      });
    }
    return list;
  };

  render() {
    const { primary_release_year, onChangeFilters } = this.props;
    const options = this.yearsRange();

    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Фильтровать по году:</label>
        <select
          id="primary_release_year"
          className="form-control"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
