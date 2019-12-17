import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

import CallApi from '../../../api/api';
import AppContextHOC from '../../HOC/AppContextHOC';

function ToggleFavorite({
  id,
  auth,
  favoriteMovies,
  toggleModalLogin,
  onToggleFavoriteMovies,
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
        onToggleFavoriteMovies();
      })
      .catch(error => {
        console.log('onToggleFavorite error -', error);
      });
  };

  return (
    <Icon onClick={() => onToggleFavorite(id)}>
      {isSelected ? 'star' : 'star_border'}
    </Icon>
  );
}

ToggleFavorite.propTypes = {
  id: PropTypes.number.isRequired,
  auth: PropTypes.object,
  getFavoriteMovies: PropTypes.func,
  favoriteMovies: PropTypes.array,
  toggleModalLogin: PropTypes.func,
};

export default AppContextHOC(ToggleFavorite);
