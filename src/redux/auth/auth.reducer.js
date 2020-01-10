import Cookies from 'universal-cookie';

import * as types from './auth.types';

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get('session_id'),
  showLoginModal: false,
  favoriteMovies: [],
  moviesWatchlist: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_AUTH:
      cookies.set('session_id', action.payload.session_id, {
        path: '/',
        maxAge: 2592000,
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
      };
    case types.LOGOUT:
      cookies.remove('session_id');
      return {
        ...state,
        user: null,
        session_id: null,
        favoriteMovies: [],
      };
    case types.SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };
    case types.UPDATE_FAVORITE_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload,
      };
    case types.UPDATE_MOVIES_WATCHLIST:
      return {
        ...state,
        moviesWatchlist: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
