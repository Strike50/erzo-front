import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Keycloak from "keycloak-js";
import axios from "axios";
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import {Provider} from "react-redux";
import {KeycloakProvider} from "react-keycloak";
import thunk from 'redux-thunk';

import App from './App';
import * as serviceWorker from './serviceWorker';
import profileReducer from "./store/reducers/profile";
import timelineReducer from "./store/reducers/timeline";
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);

const rootReducer = combineReducers({
    profile: profileReducer,
    timeline: timelineReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const keycloak = Keycloak('/keycloak.json');

const TIMEOUT = 60 * 1000;
axios.defaults.timeout = TIMEOUT;

ReactDOM.render(
  <KeycloakProvider keycloak={keycloak} initConfig={{
    onLoad: 'login-required',
    promiseType: 'native'
  }}>
    <Provider store={store}>
      <App />
    </Provider>
  </KeycloakProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
