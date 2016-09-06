import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import hashHistory from 'react-router/lib/hashHistory';
import { createStore, combineReducers } from 'redux';
import Provider from 'react-redux/lib/components/Provider';

import config from './reducers/config';
import players from './reducers/players';
import stopwatch from './reducers/stopwatch';

import { pause, tick } from './actions/actions';

import LayoutContainer from './containers/LayoutContainer.jsx';
import IndexContainer from './containers/IndexContainer.jsx';
import ConfigContainer from './containers/ConfigContainer.jsx';

const store = createStore(
  combineReducers({
    config,
    players,
    stopwatch,
  })
);

// keep track of the interval id being used to by the stopwatch's tick action
let intervalId = null;

store.subscribe(() => {
  const state = store.getState();

  if (state.stopwatch.isOn && !intervalId) {
    return intervalId = setInterval(
      () => store.dispatch(tick()),
      100
    );
  }

  if (!state.stopwatch.isOn && intervalId) {
    clearInterval(intervalId);

    return intervalId = null;
  }
});

hashHistory.listen((location) => {
  const state = store.getState();

  // whenever the user navigates out of the home page (where the timer is),
  // pause the stopwatch if it's running
  if (location.pathname !== '/' && state.stopwatch.isOn) {
    store.dispatch(pause());
  }
});

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={LayoutContainer} headerTitle="Boardgame timer">
        <IndexRoute component={IndexContainer} title="Timer" />
        <Route path="/config" component={ConfigContainer} title="Config" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('js-app')
);
