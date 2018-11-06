import withRedux from 'next-redux-wrapper';
import App from 'pages/App';
import { initializeStore } from '../app/store';

export default withRedux(initializeStore)(App);
