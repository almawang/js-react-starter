import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './home';
import Login from './login';

import './style.scss';

// entry point that just renders app
// could be used for routing at some point
ReactDOM.render((
  <Router>
    <Route path="/" component={Home} >
      <IndexRoute component={Login} />
      <Route path="noteboard" component={App} />
    </Route>
  </Router>
), document.getElementById('main'));
