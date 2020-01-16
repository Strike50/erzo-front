import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {Spinner} from "reactstrap";
import Timeline from '../timeline/timeline';

const ProfileLazy = lazy(() => import('../profile/profile'));

const NotificationLazy = lazy(() => import('../notification/notifications-list/notifications-list'));

const PostLazy = lazy(() => import('../post/post'));

const MessageLazy = lazy(() => import('../message/messageHome'));

const Routes = () => (
  <div className="view-routes">
      <Switch>
          <Suspense fallback={<Spinner color="dark" />}>
              <Route path="/profil/:username" component={ProfileLazy} />
              <Route path="/notifications" component={NotificationLazy} />
              <Route path="/post/:postId" component={PostLazy} />
              <Route path="/messages" component={MessageLazy} />
              <Route path="/" component={Timeline} exact />
              <Redirect to="/" />
          </Suspense>
      </Switch>
  </div>
);

export default Routes;
