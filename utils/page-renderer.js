import React from 'react';
import { mount } from 'enzyme';
import { Container } from 'next/app';
import { Provider } from 'react-redux';

export function renderPage(PageComponent, { store, props }) {
  return mount(
    <Container>
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    </Container>
  );
}
