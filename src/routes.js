import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import DashboardPage from './components/dashboard/DashboardPage';
import AddIncome from './components/dashboard/AddIncome';
import AddSpends from './components/dashboard/AddSpends';


export default (
    <Route path="/" component={App}>
      <IndexRoute component={DashboardPage} />
      <Route path="addincome" component={AddIncome} />
      <Route path="addspends" component={AddSpends} />
    </Route>
);
