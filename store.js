import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import blogReducer from './reducers/blog-reducer';
import routeReducer from './reducers/route-reducer';
import loginReducer from './reducers/login-reducer';
import providersReducer from './reducers/providers-reducer';

let clientStore = undefined;

export function initializeStore() {
  if (!process.browser) {
    return createStore(createReducer(), {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  }
  if (!clientStore) {
    console.log(clientStore);
    clientStore = createStore(createReducer(), {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  }
  console.log(clientStore);
  return clientStore;
}

export default function createReducer() {
  return combineReducers({
    blog: blogReducer,
    route: routeReducer,
    login: loginReducer,
    providers: providersReducer
  });
}
