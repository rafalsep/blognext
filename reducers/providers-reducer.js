import { createReducer } from 'utils/create-reducer';
import { PROVIDERS_INITIALIZED } from 'events/providers-events';

const initialState = {
  initialized: false
};

const providersReducer = createReducer(initialState, {
  [PROVIDERS_INITIALIZED]() {
    return { initialized: true };
  }
});

export default providersReducer;
