import React, { useState, useEffect } from 'react';
import { Icon, Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import CallApi from '../../../api/api';
import AppContextHOC from '../../HOC/AppContextHOC';

function ToggleFavorite({
  id,
  auth,
  favoriteMovies,
  toggleModalLogin,
  getFavoriteMovies,
  children,
  className,
}) {
  const isMovieFavorite = favoriteMovies.some(film => film.id === id);
  const [isSelected, setIsSelected] = useState(false);
  const { user, session_id } = auth;

  useEffect(() => {
    setIsSelected(isMovieFavorite);
  }, [isMovieFavorite]);

  const onToggleFavorite = id => {
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
        favorite: !isSelected,
      },
    };
    CallApi.post(`/account/${user.id}/favorite`, queryBody)
      .then(() => {
        setIsSelected(!isSelected);
      })
      .then(() => {
        getFavoriteMovies(user, session_id);
      })
      .catch(error => {
        console.log('onToggleFavorite error -', error);
      });
  };

  return (
    <Button onClick={() => onToggleFavorite(id)} className={className}>
      <Icon className="icon">{isSelected ? 'star' : 'star_border'}</Icon>
      {children && <Box ml={1}>{children}</Box>}
    </Button>
  );
}

ToggleFavorite.propTypes = {
  id: PropTypes.number.isRequired,
  auth: PropTypes.object,
  favoriteMovies: PropTypes.array,
  toggleModalLogin: PropTypes.func,
  getFavoriteMovies: PropTypes.func,
  children: PropTypes.string,
  className: PropTypes.string,
};

export default AppContextHOC(ToggleFavorite);