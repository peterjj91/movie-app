import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UISelect from './../UISelect';

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
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Фильтровать по году: "
      >
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </UISelect>
    );
  }
}
