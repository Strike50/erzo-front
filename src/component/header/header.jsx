import React, {useState} from 'react';
import './header.css';
import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
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

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const { keycloak } = useKeycloak();

  return (
    <>
    <Navbar color="light" light expand="lg">
      <NavbarBrand href="/">Erzo</NavbarBrand>
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
            <NavLink to="/profil" tag={Link}>
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
        <Form inline>
          <FormGroup>
            <Input type="text" placeholder="Rechercher un utilisateur ..." className="mr-sm-2" />
            <Button variant="outline-success">Rechercher</Button>
          </FormGroup>
        </Form>
      </Collapse>
    </Navbar>
  </>
  );
};

export default Header;
