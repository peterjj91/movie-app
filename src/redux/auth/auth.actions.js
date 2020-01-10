export const updateAuth = payload => {
  return {
    type: 'UPDATE_AUTH',
    payload,
  };
};

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

export const updateFavoriteMovies = movies => {
  return {
    type: 'UPDATE_FAVORITE_MOVIES',
    payload: movies,
  };
};

export const updateMoviesWatchlist = movies => {
  return {
    type: 'UPDATE_MOVIES_WATCHLIST',
    payload: movies,
  };
};
