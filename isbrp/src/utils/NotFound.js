import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LoginHeader from "../components/Header/LoginHeader";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

function NotFound() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/");
  };

  return (
    <>
      <LoginHeader type="bg-secondary" />
      <Container fluid className="contentBox p-4 d-flex align-items-center justify-content-center text-center">
        <div className="">
          <h3 className="mb-3">404</h3>
          <p>Page not found.</p>
          <Button variant="details" size="sm" className="rounded-pill" onClick={toLogin}>
            Return to login
          </Button>
        </div>
      </Container>
      <Footer type="bg-secondary" />
    </>
  );
}

export default NotFound;
