import React from 'react';
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import LoginHeader from "../components/Header/LoginHeader";

import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

const SessionExpired = (props) => {
  const navigate = useNavigate()

  const toLogin = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
        <LoginHeader type={'bg-' + props.type} />
        <Container fluid className={props.type === 'cse' ? 'contentBox p-4 d-flex align-items-center justify-content-center text-center' : 'pcContentBox p-4 d-flex align-items-center justify-content-center text-center'}>
            <div>
                <h3 className="mb-3">Session Expired</h3>
                <p>Please login again.</p>
                <Button variant={props.type} size="sm" className="rounded-pill" onClick={toLogin}>
                    Return to login
                </Button>
            </div>
        </Container>
        <Footer type={'bg-' + props.type} />
    </>
  );
}

export default SessionExpired;
