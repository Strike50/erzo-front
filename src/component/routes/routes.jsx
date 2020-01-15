import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import Timeline from '../timeline/timeline';
import Profile from '../profile/profile';
import NotificationsList from '../notification/notifications-list/notifications-list';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/profil/:username" component={Profile} />
      <Route path="/profil"><Profile/></Route>
      <Route path="/notifications"><NotificationsList /></Route>
      <Route path="/messages">Message</Route>
      <Route path="/" component={Timeline} exact />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default Routes;
