/* eslint-disable no-undef */
import { USER_LOGGED_IN } from 'events/login-events';
import { FACEBOOK_APP_ID } from 'common/env';
import { LOGIN_PROVIDER_FACEBOOK } from 'constants/login-providers';

export function initFacebook(dispatch) {
  window.fbAsyncInit = function asyncInitSdk() {
    FB.init({
      appId: FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      status: true,
      version: 'v3.1'
    });

    FB.AppEvents.logPageView();

    FB.Event.subscribe('auth.statusChange', ({ status }) => {
      if (status === 'connected') {
        FB.api('/me', { fields: ['email', 'name', 'picture'] }, response => {
          dispatch({
            type: USER_LOGGED_IN,
            user: { name: response.name, email: response.email, picture: response.picture.data.url },
            loginProvider: LOGIN_PROVIDER_FACEBOOK
          });
        });
      }
    });
  };

  (function initSdk(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=${FACEBOOK_APP_ID}`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}
