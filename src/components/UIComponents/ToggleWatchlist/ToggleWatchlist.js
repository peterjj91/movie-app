import React, { useState, useEffect } from 'react';
import { Icon, Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import CallApi from '../../../api/api';
import AppContextHOC from '../../HOC/AppContextHOC';

function ToggleWatchlist({
  id,
  user,
  session_id,
  moviesWatchlist,
  toggleModalLogin,
  getMoviesWatchlist,
  children,
  className,
}) {
  const isMovieWatchlist = moviesWatchlist.some(film => film.id === id);
  const [isSelected, setIsSelected] = useState(false);

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
    <Button onClick={() => onToggleWatchlist(id)} className={className}>
      <Icon className="icon">
        {isSelected ? 'bookmark' : 'bookmark_border'}
      </Icon>
      {children && <Box ml={1}>{children}</Box>}
    </Button>
  );
}

ToggleWatchlist.propTypes = {
  id: PropTypes.number.isRequired,
  moviesWatchlist: PropTypes.array,
  toggleModalLogin: PropTypes.func,
  getMoviesWatchlist: PropTypes.func,
  children: PropTypes.string,
  className: PropTypes.string,
};

export default AppContextHOC(ToggleWatchlist);
