import React from 'react';
import PropTypes from 'prop-types';
import SortBy from './SortBy';
import FilterByYear from './FilterByYear';
import Pagination from './Pagination';
import ResetFilter from './ResetFilter';

export default class Filters extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    sort_by: PropTypes.string,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    primary_release_year: PropTypes.string,
    onResetFilters: PropTypes.func,
  };

  render() {
    const {
      filters: { sort_by, primary_release_year },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
      onResetFilters,
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <FilterByYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Pagination
          onChangePage={onChangePage}
          page={page}
          total_pages={total_pages}
        />
        <ResetFilter onResetFilters={onResetFilters} />
      </form>
    );
  }
}
