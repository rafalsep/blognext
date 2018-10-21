import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import blogReducer from './reducers/blog-reducer';

export function initializeStore() {
  return createStore(createReducer(), {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export default function createReducer() {
  return combineReducers({
    blog: blogReducer
  });
}
