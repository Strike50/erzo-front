import React, {useState} from 'react';
import './header.css';
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import {useKeycloak} from 'react-keycloak';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink as Link} from "react-router-dom";
import Search from "../search/search";

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const { keycloak } = useKeycloak();
  const username = keycloak.tokenParsed.preferred_username;
  return (
    <>
    <Navbar color="light" light expand="lg">
      <NavbarBrand href="/">
        <img src={"erzo.png"} className="logo" alt="Logo de Erzo"/>
      </NavbarBrand>
      <NavbarToggler  />
      <Collapse isOpen navbar>
        <Nav className="mr-auto">
          <NavItem>
            <NavLink to="/" tag={Link}>
              <FontAwesomeIcon icon="home"/>
              <span>Accueil</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/profil/${username}`} tag={Link}>
              Profil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/notifications" tag={Link}>
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/messages" tag={Link}>
              Messages
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret>
              Compte
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={keycloak.logout}>Se déconnecter</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
        <Search />
      </Collapse>
    </Navbar>
  </>
  );
};

export default Header;
