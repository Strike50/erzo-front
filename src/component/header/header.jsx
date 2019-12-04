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
            <NavLink href="/">Accueil</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/profil">Profil</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/notifications">Notifications</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/messages">Messages</NavLink>
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
            <Input type="text" placeholder="Rechercher ..." className="mr-sm-2" />
            <Button variant="outline-success">Rechercher</Button>
          </FormGroup>
        </Form>
      </Collapse>
    </Navbar>
  </>
  );
};

export default Header;
