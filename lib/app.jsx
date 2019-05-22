import React from 'react';
import { render } from 'react-dom';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router/withRouter';
import HashRouter from 'react-router-dom/HashRouter';
import { createStore, combineReducers } from 'redux';
import Provider from 'react-redux/lib/components/Provider';

import config from './reducers/config';
import players from './reducers/players';
import stopwatch from './reducers/stopwatch';

import { pause, tick } from './actions/actions';

import LayoutContainer from './containers/LayoutContainer.jsx';
import IndexContainer from './containers/IndexContainer.jsx';
import ConfigContainer from './containers/ConfigContainer.jsx';
import mapToLinkObj from './utils/mapToLinkObj';

if (process.env.NODE_ENV === 'production') {
    ga('create', 'UA-83961876-1', 'auto');
}

const store = createStore(
    combineReducers({
        config,
        players,
        stopwatch
    })
);

// keep track of the interval id being used to by the stopwatch's tick action
let intervalId = null;

store.subscribe(() => {
    const state = store.getState();

    if (state.stopwatch.isOn && !intervalId) {
        return (intervalId = setInterval(() => store.dispatch(tick()), 100));
    }

    if (!state.stopwatch.isOn && intervalId) {
        clearInterval(intervalId);

        return (intervalId = null);
    }
});

// TODO: withRouter
// hashHistory.listen(location => {
//   const state = store.getState();

//   // whenever the user navigates out of the home page (where the timer is),
//   // pause the stopwatch if it's running
//   if (location.pathname !== '/' && state.stopwatch.isOn) {
//     store.dispatch(pause());
//   }

//   if (process.env.NODE_ENV === 'production') {
//     ga('set', 'page', location.pathname);
//     ga('send', 'pageview');
//   }
// });

const links = [
    ['/', 'Timer', IndexContainer],
    ['/config', 'Config', ConfigContainer]
].map(mapToLinkObj);

render(
    <Provider store={store}>
        <HashRouter>
            <Route
                path="/"
                render={props => (
                    <LayoutContainer
                        activePath={props.location.pathname}
                        headerTitle="Boardgame timer"
                        links={links}
                    >
                        <Route
                            exact
                            path="/"
                            component={IndexContainer}
                            title="Timer"
                        />

                        <Route
                            path="/config"
                            component={ConfigContainer}
                            title="Config"
                        />
                    </LayoutContainer>
                )}
            />
        </HashRouter>
    </Provider>,
    document.getElementById('js-app')
);
