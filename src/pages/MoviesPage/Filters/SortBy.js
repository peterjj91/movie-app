import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UISelect from '../../../components/UIComponents/Select';

export default class SortBy extends PureComponent {
  static propTypes = {
    sort_by: PropTypes.string,
    primary_release_year: PropTypes.string,
    onChangeFilters: PropTypes.func.isRequired,
    options: PropTypes.array,
  };

  static defaultProps = {
    options: [
      {
        label: 'Популярные по убыванию',
        value: 'popularity.desc',
      },
      {
        label: 'Популярные по возростанию',
        value: 'popularity.asc',
      },
      {
        label: 'Рейтинг по убыванию',
        value: 'vote_average.desc',
      },
      {
        label: 'Рейтинг по возростанию',
        value: 'vote_average.asc',
      },
    ],
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;

    return (
      <UISelect
        id="sort_by"
        name="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
        labelText="Сортировать по: "
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
