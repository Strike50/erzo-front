import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Timeline from '../timeline/timeline';
import Profile from "../profile/profile";

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/profil"><Profile/></Route>
      <Route>Notification</Route>
      <Route>Message</Route>
      <Route path="logout">logout</Route>
      <Route path="/" exact><Timeline /></Route>
    </Switch>
  </div>
);

export default Routes;
