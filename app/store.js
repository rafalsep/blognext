import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import analyticsMiddleware from 'utils/analytics-middleware';
import blogReducer from './reducers/blog-reducer';
import routeReducer from './reducers/route-reducer';
import loginReducer from './reducers/login-reducer';

export function initializeStore(initialState) {
  return createStore(createReducer(), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware), applyMiddleware(analyticsMiddleware)));
}

export default function createReducer() {
  return combineReducers({
    blog: blogReducer,
    route: routeReducer,
    login: loginReducer
  });
}
