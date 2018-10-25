/* eslint-disable no-undef */
import { USER_LOGGED_IN } from 'events/login-events';
import { GOOGLE_PLUS_API_KEY, GOOGLE_PLUS_CLIENT_ID } from 'common/env';
import { LOGIN_PROVIDER_GOOGLE } from 'constants/login-providers';

export function initGooglePlus(dispatch) {
  function makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people
      .get({
        resourceName: 'people/me',
        'requestMask.includeField': 'person.names,person.photos,person.emailAddresses'
      })
      .then(
        response => {
          dispatch({
            type: USER_LOGGED_IN,
            user: { name: response.result.names[0].displayName, email: response.result.emailAddresses[0].value, picture: response.result.photos[0].url },
            loginProvider: LOGIN_PROVIDER_GOOGLE
          });
        },
        reason => {
          console.log(`Error: ${reason.result.error.message}`);
        }
      );
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      makeApiCall();
    }
  }

  function start() {
    gapi.client
      .init({
        apiKey: GOOGLE_PLUS_API_KEY,
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
        clientId: GOOGLE_PLUS_CLIENT_ID,
        scope: 'profile'
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  }

  function loadClient() {
    gapi.load('client', start);
  }

  (function initSdk(d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://apis.google.com/js/client.js';
    js.onload = () => {
      loadClient();
    };
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'google-api');
}
