import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../store';

export async function createModelForPage(PageComponent) {
  const store = createStore(createReducer(), {}, applyMiddleware(thunkMiddleware));
  const props = await PageComponent.getInitialProps({ store });
  return { store, props };
}
