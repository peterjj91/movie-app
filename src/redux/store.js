import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cookies } from '../utils/cookies';
import rootReducer from './rootReducer';
import { FETCH_SUCCESS_AUTH, LOGOUT } from './auth/auth.types';

// const thunk = ({ dispatch, getState }) => next => action => {
//   console.log('tunk', getState());
//   if (typeof action === 'function') {
//     return action(dispatch, getState);
//   }
//   next(action);
// };

const updateCookies = ({ dispatch, getState }) => next => action => {
  if (action.type === FETCH_SUCCESS_AUTH) {
    cookies.set('session_id', action.payload.session_id, {
      path: '/',
      maxAge: 2592000,
    });
  }
  if (action.type === LOGOUT) {
    cookies.remove('session_id');
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);

export default store;
