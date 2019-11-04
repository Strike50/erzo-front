import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';

export const NotificationHome = () => (
  <NavItem>
    <NavLink tag={Link} to={'/notifications'}>
      <FontAwesomeIcon icon={'bell'} />
      <span>
        <Translate contentKey={'global.menu.notifications'}>Notifications</Translate>
      </span>
    </NavLink>
  </NavItem>
);
