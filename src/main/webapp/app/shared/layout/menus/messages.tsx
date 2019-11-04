import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';

export const MessageHome = () => (
  <NavItem>
    <NavLink tag={Link} to={'/messages'}>
      <FontAwesomeIcon icon={'envelope'} />
      <span>
        <Translate contentKey={'global.menu.messages'}>Messages</Translate>
      </span>
    </NavLink>
  </NavItem>
);
