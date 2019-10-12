import React from 'react';
import PropTypes from 'prop-types';
import SortBy from './SortBy';
import FilterByYear from './FilterByYear';

export default class Filters extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    sort_by: PropTypes.string,
    page: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    primary_release_year: PropTypes.string,
  };

  render() {
    const {
      filters: { sort_by, primary_release_year },
      page,
      onChangeFilters,
      onChangePage,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <FilterByYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
      </form>
    );
  }
}
