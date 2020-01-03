import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

import CallApi from '../../../api/api';
import AppContextHOC from '../../HOC/AppContextHOC';

function ToggleWatchlist({
  id,
  auth,
  moviesWatchlist,
  toggleModalLogin,
  getMoviesWatchlist,
}) {
  const isMovieWatchlist = moviesWatchlist.some(film => film.id === id);
  const [isSelected, setIsSelected] = useState(false);
  const { user, session_id } = auth;

  useEffect(() => {
    setIsSelected(isMovieWatchlist);
  }, [isMovieWatchlist]);

  const onToggleWatchlist = id => {
    if (!session_id) {
      return toggleModalLogin();
    }

    const queryBody = {
      params: {
        session_id: session_id,
      },
      body: {
        media_type: 'movie',
        media_id: id,
        watchlist: !isSelected,
      },
    };

    CallApi.post(`/account/${user.id}/watchlist`, queryBody)
      .then(() => {
        setIsSelected(!isSelected);
      })
      .then(() => {
        getMoviesWatchlist(user, session_id);
      })
      .catch(error => {
        console.log('onToggleWatchlist error -', error);
      });
  };

  return (
    <Icon onClick={() => onToggleWatchlist(id)} className="icon">
      {isSelected ? 'bookmark' : 'bookmark_border'}
    </Icon>
  );
}

ToggleWatchlist.propTypes = {
  id: PropTypes.number.isRequired,
  auth: PropTypes.object,
  moviesWatchlist: PropTypes.array,
  toggleModalLogin: PropTypes.func,
  getMoviesWatchlist: PropTypes.func
};

export default AppContextHOC(ToggleWatchlist);
