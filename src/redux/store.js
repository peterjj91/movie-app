import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

// const logget = function(store) {
//   return function(next) {
//     return function(action) {
//       return next(action)
//     }
//   }
// }
const logger = store => next => action => {
  console.log('logger state', store.getState());
  console.log('logger', action.type, action.payload);
  return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
  // other store enhancers if any
);

export default store;
