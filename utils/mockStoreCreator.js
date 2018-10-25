import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export function createStoreMock(store = {}) {
  const mockStore = configureStore([thunk]);
  return mockStore(store);
}
