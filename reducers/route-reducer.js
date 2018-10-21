import { createReducer } from 'utils/create-reducer';
import { LOCATION_CHANGED } from 'events/location-events';

const initialState = {
  location: undefined
};

const routeReducer = createReducer(initialState, {
  [LOCATION_CHANGED](state, action) {
    return { ...state, location: action.location };
  }
});

export default routeReducer;
