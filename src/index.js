import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from "keycloak-js";
import ReactDOM from 'react-dom';
import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {KeycloakProvider} from "react-keycloak";
import thunk from 'redux-thunk';

import App from './App';
import * as serviceWorker from './serviceWorker';
import profileReducer from "./store/reducers/profile.reducer";
import timelineReducer from "./store/reducers/timeline.reducer";
import createPostReducer from "./store/reducers/create-post.reducer";
import searchReducer from "./store/reducers/search.reducer";
import mediaReducer from "./store/reducers/media.reducer";
import {loadIcons} from "./config/icon-loader";
import notificationsListReducer from "./store/reducers/notifications-list.reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    timeline: timelineReducer,
    notificationsList: notificationsListReducer,
    createPost: createPostReducer,
    search: searchReducer,
    media: mediaReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

loadIcons();

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
serviceWorker.register();
