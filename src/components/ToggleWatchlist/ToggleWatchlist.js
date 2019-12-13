import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

import CallApi from '../../api/api';
import AppContextHOC from './../HOC/AppContextHOC';

function ToggleWatchlist({
  id,
  // session_id,
  // user,
  auth,
  getMoviesWatchlist,
  moviesWatchlist,
  toggleModalLogin,
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
    <Icon onClick={() => onToggleWatchlist(id)}>
      {isSelected ? 'bookmark' : 'bookmark_border'}
    </Icon>
  );
}

ToggleWatchlist.propTypes = {
  id: PropTypes.number.isRequired,
  // session_id: PropTypes.string,
  // user: PropTypes.object,
  auth: PropTypes.object,
  getMoviesWatchlist: PropTypes.func,
  moviesWatchlist: PropTypes.array,
  toggleModalLogin: PropTypes.func,
};

export default AppContextHOC(ToggleWatchlist);
