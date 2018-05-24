import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { useBasename } from 'history';
import routes from './routes';
import './styles/styles.css';

render(
  <Router history={useBasename(() => browserHistory)({ basename: BASENAME })} routes={routes} />,
  document.getElementById('app')
);
