/* eslint-disable no-undef */
export function initServiceWorker() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('service worker registered.'))
      .catch(err => console.dir(err));
  }
}
