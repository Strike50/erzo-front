import './header.css';

import React, {useState} from 'react';
import * as firebase from "firebase";
import {firebaseConfig} from "../../config/firebase";
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
import {eNotificationStatus} from "../../enum/notificationStatus";

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState (false);
  let [notifsCount] = useState (0);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const handleClickToggle = () => setIsOpen(!isOpen);

  const { keycloak } = useKeycloak();
  const username = keycloak.tokenParsed.preferred_username;
  firebase.initializeApp(firebaseConfig);

  const ref = firebase.database().ref('/' + keycloak.tokenParsed.sub + '/');
  ref.on("child_added", snap => {
    if (snap.val().notificationStatus === eNotificationStatus.NOT_SEEN) {
      console.log("child_added");
    }
  });

  ref.on("child_changed", snap => {
    if (snap.val().notificationStatus === eNotificationStatus.NOT_SEEN) {
      console.log("child_changed");
    }
  });

  return (
    <>
    <Navbar color="light" expand fixed={"top"} sticky={"top"}>
      <NavbarBrand href="/">
        <img src={"/erzo.png"} className="logo" alt="Logo de Erzo"/>
      </NavbarBrand>
      <NavbarToggler onClick={handleClickToggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto">
          <NavItem>
            <NavLink to="/" tag={Link}>
              <FontAwesomeIcon icon="home"/>
              <span>Accueil</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`/profil/${username}`} tag={Link}>
              <FontAwesomeIcon icon="user"/>
              <span>Profil</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/notifications" tag={Link}>
              <FontAwesomeIcon icon="bell"/>
              <span>Notifications {notifsCount}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/messages" tag={Link}>
              <FontAwesomeIcon icon="envelope"/>
              <span>Messages</span>
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret>
              <FontAwesomeIcon icon="cog"/>
              <span>{username}</span>
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
