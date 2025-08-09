// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { thunk } from 'redux-thunk';
// import { cartReducer } from './reducers/cartReducer';

// const rootReducer = combineReducers({
//     cart: cartReducer
// });

// export const store = createStore(rootReducer, applyMiddleware(thunk));
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // add other reducers here if you have them
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

