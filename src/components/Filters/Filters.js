import React from 'react';
import PropTypes from 'prop-types';
import SortBy from './SortBy';
import FilterByYear from './FilterByYear';
import Pagination from './Pagination';
import ResetFilter from './ResetFilter';
import GenresContainer from './GenresContainer';

export default class Filters extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    total_pages: PropTypes.number.isRequired,
    onResetFilters: PropTypes.func,
  };

  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres, page },
      total_pages,
      onChangeFilters,
      onResetFilters,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <FilterByYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <GenresContainer
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
        />
        <ResetFilter onResetFilters={onResetFilters} />
        <Pagination
          onChangeFilters={onChangeFilters}
          page={page}
          with_genres={with_genres}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
