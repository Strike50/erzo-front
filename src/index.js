import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import Keycloak from "keycloak-js";
import {KeycloakProvider} from "react-keycloak";
import rootReducer from "./reducers";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);

const keycloak = Keycloak('/keycloak.json');

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
