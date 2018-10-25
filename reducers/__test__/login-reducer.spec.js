import { USER_LOGGED_IN, USER_LOGGED_OUT } from 'events/login-events';
import loginReducer from '../login-reducer';

describe('login-reducer', () => {
  test('should validate USER_LOGGED_IN', () => {
    const state = loginReducer(undefined, { type: USER_LOGGED_IN, loginProvider: 'facebook', user: 'user' });

    expect(state.loginProvider).toBe('facebook');
    expect(state.user).toBe('user');
  });

  test('should validate USER_LOGGED_OUT', () => {
    const state = loginReducer({ loginProvider: 'facebook', user: 'user' }, { type: USER_LOGGED_OUT });

    expect(state.loginProvider).toBeUndefined();
    expect(state.user).toBeUndefined();
  });
});
