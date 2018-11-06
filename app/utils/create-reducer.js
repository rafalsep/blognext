export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action = {}) {
    if (handlers[action.type] !== undefined) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
