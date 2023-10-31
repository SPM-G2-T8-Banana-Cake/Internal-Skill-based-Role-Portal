import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { FiLogOut, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.png";

function HrHeader() {
  const location = useLocation();

  const user = (
    <span>
      <FiUser />
      <span className="mx-2">{location.state.id}</span>
    </span>
  );

  return (
    <Navbar fixed="top" expand="md" className="bg-header text-white px-3">
      <Navbar.Toggle className="text-white" />
      <Navbar.Brand>
        <NavLink to="/hr-home" state={{ id: location.state.id }}>
          <Image src={logo} alt="Logo" width="50" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="me-auto">
          <NavLink
            to="/roles-management"
            className="text-decoration-none text-white me-3"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "white" : "white",
              };
            }}
            state={{ id: location.state.id }}
          >
            Roles Management
          </NavLink>
          {/* <NavLink to="/job-management" state={{id: location.state.id}} className='text-decoration-none text-dark me-3'>Job Management</NavLink> */}
          <NavLink
            to="/applications-management"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "white" : "white",
              };
            }}
            state={{ id: location.state.id }}
            className="text-decoration-none text-white"
          >
            Applications Management
          </NavLink>
        </Nav>
        <NavDropdown style={{width: '150px'}} title={user} className="text-end text-white">
          <NavDropdown.Item href="/">
            <FiLogOut className="me-2" />
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HrHeader;
