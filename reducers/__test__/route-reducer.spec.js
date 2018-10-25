import { LOCATION_CHANGED } from 'events/location-events';
import routeReducer from '../route-reducer';

describe('route-reducer', () => {
  test('should validate LOCATION_CHANGED', () => {
    const state = routeReducer(undefined, { type: LOCATION_CHANGED, location: 'location' });

    expect(state.location).toBe('location');
  });
});
