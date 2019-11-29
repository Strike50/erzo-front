import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Timeline} from '../timeline/timeline';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route>Profil</Route>
      <Route>Notification</Route>
      <Route>Message</Route>
      <Route path="logout">logout</Route>
      <Route path="/"><Timeline /></Route>
    </Switch>
  </div>
);

export default Routes;
