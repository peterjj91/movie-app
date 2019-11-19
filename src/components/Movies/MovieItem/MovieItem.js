import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Icon from '@material-ui/core/Icon';
import CallApi from '../../../api/api';

export default class MovieItem extends Component {
  state = {
    isFavorite: false,
    isWatchlist: false,
  };

  static propTypes = {
    item: PropTypes.object,
    user: PropTypes.object,
    session_id: PropTypes.string,
  };

  onToggleFavorite = id => {
    const { session_id, user } = this.props;

    const queryBody = {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !this.state.isFavorite,
      },
    };

    CallApi.post(`/account/${user.id}/favorite`, queryBody)
      .then(() => {
        return CallApi.get(`/account/${user.id}/favorite/movies`, {
          params: {
            session_id: session_id,
          },
        });
      })
      .then(data => {
        this.setState(prevState => ({
          isFavorite: !prevState.isFavorite,
        }));
      })
      .catch(error => {
        console.log('onToggleFavorite error -', error);
      });
  };

  onToggleWatchlist = id => {
    const { session_id, user } = this.props;

    const queryBody = {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: 'movie',
        media_id: id,
        watchlist: !this.state.isWatchlist,
      },
    };

    CallApi.post(`/account/${user.id}/watchlist`, queryBody)
      .then(() => {
        return CallApi.get(`/account/${user.id}/favorite/movies`, {
          params: {
            session_id: session_id,
          },
        });
      })
      .then(data => {
        this.setState(prevState => ({
          isWatchlist: !prevState.isWatchlist,
        }));
      })
      .catch(error => {
        console.log('onToggleFavorite error -', error);
      });
  };

  render() {
    const { item } = this.props;
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
            onClick={() => this.onToggleFavorite(item.id)}
          >
            <Icon>{isFavorite ? 'star' : 'star_border'}</Icon>
          </div>
          <div
            className="card-footer__link"
            onClick={() => this.onToggleWatchlist(item.id)}
          >
            <Icon>{isWatchlist ? 'bookmark' : 'bookmark_border'}</Icon>
          </div>
        </div>
      </div>
    );
  }
}
