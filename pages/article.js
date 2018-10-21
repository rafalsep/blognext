import React from 'react';
import { connect } from 'react-redux';
import { startClock, serverRenderClock } from '../store';
import Examples from '../components/examples';

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    return {};
  }

  componentDidMount() {}

  render() {
    return <div>bbbbbb</div>;
  }
}

export default connect()(Index);
