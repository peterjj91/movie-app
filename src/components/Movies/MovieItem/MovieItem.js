import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

export default class MovieItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onWatchlist: PropTypes.func.isRequired,
  };

  render() {
    const { item, onFavorite, onWatchlist } = this.props;
    return (
      <div className="card" style={{ width: '100%' }}>
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
          <Icon onClick={() => onFavorite(item.id)}>star_border</Icon>
          <Icon onClick={() => onWatchlist(item.id)}>bookmark_border</Icon>
        </div>
      </div>
    );
  }
}
