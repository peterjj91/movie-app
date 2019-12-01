import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToggleFavorite from '../../ToggleFavorite';
import ToggleWatchlist from '../../ToggleWatchlist';

export default class MovieItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    user: PropTypes.object,
    session_id: PropTypes.string,
  };

  render() {
    const { item } = this.props;

    return (
      <div className="card card" style={{ width: '100%' }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div className="card-footer__link">
            <ToggleFavorite id={item.id} />
          </div>
          <div className="card-footer__link">
            <ToggleWatchlist id={item.id} />
          </div>
        </div>
      </div>
    );
  }
}
