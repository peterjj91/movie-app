import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    with_genres: PropTypes.array,
    onChangeFilters: PropTypes.func.isRequired,
  };

  onClick = event => {
    this.props.onChangeFilters({ target: { name: 'page', value: event } });
  };

  render() {
    const { page, total_pages, with_genres } = this.props;

    return (
      <div className="mb-3 mt-3">
        <div className="btn-group mr-3">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => this.onClick(page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={() => this.onClick(page + 1)}
          >
            Вперед
          </button>
        </div>

        <span>
          {page} из {total_pages}
        </span>

        {with_genres.length && (
          <p className="mt-2">Теуйщие жанры: {with_genres.map(e => e.name)}</p>
        )}
      </div>
    );
  }
}
