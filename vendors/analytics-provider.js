import { ANALYTICS_APP_ID } from 'common/env';

export function initAnalytics() {
  window.ga =
    window.ga ||
    function init(args) {
      (ga.q = ga.q || []).push(...args);
    };
  ga.l = +new Date();
  ga('create', ANALYTICS_APP_ID, 'auto');
  ga('send', 'pageview');
}
