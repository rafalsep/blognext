import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { LOCATION_CHANGED } from 'events/location-events';
import { initFacebook } from 'vendors/facebook-provider';
import { initGooglePlus } from 'vendors/google-plus-provider';
import { initAnalytics } from 'vendors/analytics-provider';
import { initializeStore } from '../store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    ctx.store.dispatch({ type: LOCATION_CHANGED, location: router.asPath });
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    };
  }

  componentDidMount() {
    initFacebook(this.props.store.dispatch);
    initGooglePlus(this.props.store.dispatch);
    initAnalytics();
  }

  render() {
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

export default withRedux(initializeStore)(MyApp);
