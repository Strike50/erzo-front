import React from 'react';
import './header.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const Header = () => {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Erzo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/profil">Profil</Nav.Link>
          <Nav.Link href="/notifications">Notifications</Nav.Link>
          <Nav.Link href="/messages">Messages</Nav.Link>
          <NavDropdown title="" id="basic-nav-dropdown">
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Rechercher ..." className="mr-sm-2" />
          <Button variant="outline-success">Rechercher</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
