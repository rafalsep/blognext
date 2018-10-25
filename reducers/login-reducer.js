import { createReducer } from 'utils/create-reducer';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from 'events/login-events';

const initialState = {
  loginProvider: undefined,
  user: undefined
};

const loginReducer = createReducer(initialState, {
  [USER_LOGGED_IN](state, action) {
    return { ...state, loginProvider: action.loginProvider, user: action.user };
  },
  [USER_LOGGED_OUT](state) {
    return { ...state, loginProvider: undefined, user: undefined };
  }
});

export default loginReducer;
