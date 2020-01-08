import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  auth: {
    user: null,
    session_id: cookies.get('session_id'),
  },
  showModal: false,
  favoriteMovies: [],
  moviesWatchlist: [],
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_AUTH':
      cookies.set('session_id', action.payload.session_id, {
        path: '/',
        maxAge: 2592000,
      });

      return {
        ...state,

        auth: {
          ...state.auth,
          user: action.payload.user,
          session_id: action.payload.session_id,
        },
      };
    case 'LOGOUT':
      cookies.remove('session_id');

      return {
        ...state,

        auth: {
          ...state.auth,
          user: null,
          session_id: null,
        },
      };
    default:
      return state;
  }
};

export default reducerApp;
