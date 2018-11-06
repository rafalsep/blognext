import { PAGE_LOADED } from 'events/analytics-events';

export function registerPageLoadedAction(page, title) {
  return dispatch => dispatch({ type: PAGE_LOADED, page, title });
}
