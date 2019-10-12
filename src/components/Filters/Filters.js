import React from 'react';
import PropTypes from 'prop-types';

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      page,
      onChangeFilters,
      onChangePage,
    } = this.props;
    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Сортировать по:</label>
          <select
            id="sort_by"
            className="form-control"
            name="sort_by"
            value={sort_by}
            onChange={onChangeFilters}
          >
            <option value="popularity.desc">Популярные по убыванию</option>
            <option value="popularity.asc">Популярные по возростанию</option>
            <option value="vote_average.desc">Рейтинг по убыванию</option>
            <option value="vote_average.asc">Рейтинг по возростанию</option>
          </select>
        </div>
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

Filters.propTypes = {
  onChangeFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  sort_by: PropTypes.string,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
};
