import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import CallApi from '../../../api/api';

export default class MovieItem extends Component {
  state = {
    isFavorite: false,
  };

  static propTypes = {
    item: PropTypes.object,
    user: PropTypes.object,
    session_id: PropTypes.string,
  };

  onToggleFavorite = id => {
    const { session_id, user } = this.props;

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !this.state.isFavorite,
      },
    })
      .then(data => {
        console.log(data, 11);
        return CallApi.get(`/account/${user.id}/favorite/movies`, {
          params: {
            session_id: session_id,
          },
        });
      })
      .then(() => {
        this.setState(prevState => ({
          isFavorite: !prevState.isFavorite,
        }));
      })
      .catch(error => {
        console.log('onToggleFavorite error -', error);
      });
  };

  onToggleWatchlist = () => {
    console.log('onWatchlist');
  };

  render() {
    const { item } = this.props;
    const { isFavorite } = this.state;

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
            onClick={() => this.onToggleFavorite(item.id)}
          >
            <Icon>{isFavorite ? 'star' : 'star_border'}</Icon>
          </div>
          <div
            className="card-footer__link"
            onClick={() => this.onToggleWatchlist(item.id)}
          >
            <Icon>bookmark_border</Icon>
          </div>
        </div>
      </div>
    );
  }
}
