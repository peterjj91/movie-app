import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  onClick = event => {
    this.props.onChangePage(event);
  };

  render() {
    const { page, total_pages } = this.props;

    return (
      <React.Fragment>
        <div className="btn-group">
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

        <p>
          {page} из {total_pages}
        </p>
      </React.Fragment>
    );
  }
}
