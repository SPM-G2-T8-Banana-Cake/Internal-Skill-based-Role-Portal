import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { FiLogOut, FiUser } from "react-icons/fi";
import logo from "../../assets/logo.png";

function StaffHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    navigate("/")
  }
  const user = (
    <span>
      <FiUser />
      <span className="mx-2">{location.state.id}</span>
    </span>
  );

  return (
    <Navbar fixed="top" expand="md" className="bg-header navbar-dark px-3">
      <Navbar.Toggle className="text-dark" />
      <Navbar.Brand>
        <NavLink to="/staff-home" state={{ id: location.state.id }}>
          <Image src={logo} alt="Logo" width="50" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="me-auto">
          <NavLink
            to="/available-roles"
            className="text-decoration-none text-dark me-3"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "black" : "black",
              };
            }}
            state={{ id: location.state.id }}
          >
            Avaliable Roles
          </NavLink>
        </Nav>
        <NavDropdown title={user} className="text-dark">
          <NavDropdown.Item onClick={logout}>
            <FiLogOut className="me-2" />
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default StaffHeader;
