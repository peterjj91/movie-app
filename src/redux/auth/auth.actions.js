import CallApi from '../../api/api';

export const fetchAuth = ({ session_id }) => dispatch => {
  dispatch({
    type: 'FETCH_REQUEST_AUTH',
  });

  CallApi.get(`/account`, {
    params: {
      session_id,
    },
  })
    .then(user => {
      dispatch(updateAuth({ user, session_id }));
      dispatch(fetchFavoriteMovies({ user, session_id }));
      dispatch(fetchMoviesWatchlist({ user, session_id }));
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_AUTH',
        payload: error,
      });
    });
};

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
  dispatch({
    type: 'FETCH_REQUEST_FAVORITE_MOVIES',
  });

  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id,
    },
  })
    .then(data => {
      dispatch(updateFavoriteMovies(data.results));
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_FAVORITE_MOVIES',
        payload: error,
      });
    });
};

export const updateFavoriteMovies = movies => {
  return {
    type: 'UPDATE_FAVORITE_MOVIES',
    payload: movies,
  };
};

export const fetchMoviesWatchlist = ({ user, session_id }) => dispatch => {
  dispatch({
    type: 'FETCH_REQUEST_MOVIES_WATCHLIST',
  });

  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id: session_id,
    },
  })
    .then(data => {
      dispatch(updateMoviesWatchlist(data.results));
    })
    .catch(error => {
      dispatch({
        type: 'FETCH_ERROR_MOVIES_WATCHLIST',
        payload: error,
      });
    });
};

export const updateMoviesWatchlist = movies => {
  return {
    type: 'UPDATE_MOVIES_WATCHLIST',
    payload: movies,
  };
};

export const updateAuth = ({ user, session_id }) => ({
  type: 'UPDATE_AUTH',
  payload: {
    user,
    session_id,
  },
});

export const onLogOut = payload => {
  return {
    type: 'LOGOUT',
  };
};

export const toggleModalLogin = payload => {
  return {
    type: 'SHOW_LOGIN_MODAL',
  };
};
