import { GET_IN_TOUCH_CLICKED, PAGE_LOADED } from 'events/analytics-events';
import { LOCATION_CHANGED } from 'events/location-events';

// eslint-disable-next-line no-unused-vars
const analyticsMiddleware = store => next => action => {
  if (typeof ga !== 'undefined') {
    if (action.type === PAGE_LOADED) {
      ga('send', {
        hitType: 'pageview',
        page: action.page,
        title: action.title
      });
    } else if (action.type === GET_IN_TOUCH_CLICKED) {
      ga('send', 'event', 'link', GET_IN_TOUCH_CLICKED, action.website);
    } else if (action.type !== LOCATION_CHANGED) {
      ga('send', 'event', 'Action', action.type);
    }
  }
  return next(action);
};

export default analyticsMiddleware;
