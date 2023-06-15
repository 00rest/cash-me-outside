import React from "react";
import Auth from '../utils/auth';
import { Navbar, Nav } from 'react-bootstrap';

const Navbars = () => {
  return (
    <Navbar expand="sm" variant="dark" style={{ backgroundColor: "#003366", color: "white" }}>
      <Navbar.Brand href="./home" style={{ marginLeft: 10, color: "white" }}>
        Cash Me Outside
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="ml-auto">
          <Nav.Link href="getcash" className="text-white">
            Ca$h
          </Nav.Link>
          <Nav.Link href="transfer" className="text-white">
            Wire
          </Nav.Link>
          <Nav.Link href="zelle" className="text-white">
            Zelle
          </Nav.Link>
          <Nav.Link onClick={Auth.logout} className="text-white">
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;