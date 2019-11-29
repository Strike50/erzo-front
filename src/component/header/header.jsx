import React from 'react';
import './header.css';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';

const Header = () => {

  return (
    <Navbar color="light" className="light" expand="md">
      <NavbarBrand href="/">Erzo</NavbarBrand>
      <NavItem>
        <NavLink href="/profil/">Profil</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/notifications/">Notifications</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/messages/">Messages</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            Option 1
          </DropdownItem>
          <DropdownItem>
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
};

export default Header;
