import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
// import CallApi from '../../../api/api';

export default class MovieItem extends Component {
  state = {
    isFavorite: false,
    isWatchlist: false,
  };

  static propTypes = {
    item: PropTypes.object,
    user: PropTypes.object,
    session_id: PropTypes.string,
    onToggleFavorite: PropTypes.func,
    onToggleWatchlist: PropTypes.func,
  };

  render() {
    const { item, onToggleFavorite, onToggleWatchlist } = this.props;
    const { isFavorite, isWatchlist } = this.state;

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
          <div
            className="card-footer__link"
            onClick={() => onToggleFavorite(item.id)}
          >
            <Icon>{isFavorite ? 'star' : 'star_border'}</Icon>
          </div>
          <div
            className="card-footer__link"
            onClick={() => onToggleWatchlist(item.id)}
          >
            <Icon>{isWatchlist ? 'bookmark' : 'bookmark_border'}</Icon>
          </div>
        </div>
      </div>
    );
  }
}
