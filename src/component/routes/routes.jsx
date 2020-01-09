import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import Timeline from '../timeline/timeline';
import Profile from '../profile/profile';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/profil/:username" component={Profile} />
      <Route path="/notifications">Notification</Route>
      <Route path="/messages">Message</Route>
      <Route path="/" component={Timeline} exact />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes;
