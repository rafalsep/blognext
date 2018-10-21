import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initializeStore } from '../store';
import { LOCATION_CHANGED } from 'events/location-events';
import { initFacebook } from 'vendors/facebook-provider';
import { initGooglePlus } from 'vendors/google-plus-provider';
import { initAnalytics } from 'vendors/analytics-provider';
import { PROVIDERS_INITIALIZED } from '../events/providers-events';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    ctx.store.dispatch({ type: LOCATION_CHANGED, location: router.asPath });
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    };
  }

  componentDidMount() {
    console.log(this.props.store.getState());
    if (!this.props.store.getState().providers.initialized) {
      initFacebook(this.props.store.dispatch);
      initGooglePlus(this.props.store.dispatch);
      initAnalytics();
      this.props.store.dispatch({ type: PROVIDERS_INITIALIZED });
      console.log('componentDidMount');
    }
  }

  render() {
    console.log('render');
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore, {
  serializeState: state => state,
  deserializeState: state => state
})(MyApp);
