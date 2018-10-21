import { GET_IN_TOUCH_CLICKED } from 'events/analytics-events';

export function registerGetInTouchClick(website) {
  return {
    type: GET_IN_TOUCH_CLICKED,
    website
  };
}
