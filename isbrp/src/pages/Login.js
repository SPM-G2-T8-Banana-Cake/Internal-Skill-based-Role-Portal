import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/Header/LoginHeader.js";
import Footer from "../components/Footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";
import Image from "react-bootstrap/esm/Image.js";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import logo from "../assets/logo.png";

import { BsPersonFillGear, BsFillBuildingsFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [hrLogin, setHrLogin] = useState(false);
  const [staffLogin, setStaffLogin] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleEnter = (value) => {
    if (value === "Enter") {
      handleHRLogin();
      handleStaffLogin();
    }
  };

  const handleHRLogin = () => {
    if (username === "hr10001" && password === "password") {
      localStorage.setItem("id", "hr10001")
      navigate("/hr-home", { state: { id: "hr10001" } });
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleStaffLogin = () => {
    if (username.includes("st") && password === "password") {
      localStorage.setItem("id", username)
      navigate("/staff-home", { state: { id: username } });
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <LoginHeader type={"bg-secondary"} />
      <section className="vh-100 vw-70 bg-grey">
        <Container className="py-5 h-100">
          <Row className="row d-flex justify-content-center align-items-center mt-4 h-100">
            <Col className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <Row className="row g-0">
                  <Col className="col-md-6 col-lg-6 d-none d-md-block">
                    <Image src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"} alt="Login Hero" className="h-100" fluid style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </Col>
                  <Col className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form>
                        <img src={logo} className="w-100 mb-4 mx-1" alt="Brand Logo" fluid style={{ borderRadius: "1rem 0 0 1rem" }} />
                        {termsOfUse ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setTermsOfUse(false);
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Terms of Use
                              </h5>
                              <br />
                              <br />
                              <span>
                                Our Terms of Use were last updated on <i>2/10/2023</i>.<br />
                                Please read these terms and conditions carefully before using Our Service.
                                <br />
                                <br />
                                You must provide us information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service.
                              </span>
                            </Form.Group>
                          </>
                        ) : privacyPolicy ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setPrivacyPolicy(false);
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Privacy Policy
                              </h5>
                              <br />
                              <br />
                              <span>
                                Our Privacy Policy were last updated on <i>2/10/2023</i>.<br /> <br />
                                This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the Service. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                              </span>
                            </Form.Group>
                          </>
                        ) : hrLogin ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setHrLogin(false);
                                    setStaffLogin(false);
                                    setError("");
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Sign into your account
                              </h5>
                              <br />
                              <br />
                              <Form.Label className="fw-bold">HR Username</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => handleEnter(e.key)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">HR Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => handleEnter(e.key)} type="password" />
                            </Form.Group>
                            {error ? <Alert variant="danger">Username or password is incorrect. Please try again.</Alert> : null}
                            <div className="text-end">
                              <Button variant="details" onClick={handleHRLogin}>
                                Login
                              </Button>
                            </div>
                          </>
                        ) : staffLogin ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setHrLogin(false);
                                    setStaffLogin(false);
                                    setError("");
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Sign into your account
                              </h5>
                              <br />
                              <br />
                              <Form.Label className="fw-bold">Staff Username</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => handleEnter(e.key)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">Staff Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => handleEnter(e.key)} type="password" />
                            </Form.Group>
                            {error ? <Alert variant="danger">Username or password is incorrect. Please try again.</Alert> : null}
                            <div className="text-end">
                              <Button variant="details" onClick={handleStaffLogin}>
                                Login
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="fw-bold t">I am a...</p>
                            <InputGroup className="mb-3">
                              <InputGroup.Text style={{ width: "10%" }} className="bg-grey justify-content-center">
                                <BsPersonFillGear />
                              </InputGroup.Text>
                              <Button className="bg-light" style={{ width: "90%" }} variant="white" onClick={() => setHrLogin(true)}>
                                Human Resource Executive
                              </Button>
                            </InputGroup>
                            <InputGroup className="mb-5">
                              <InputGroup.Text style={{ width: "10%" }} className="bg-grey justify-content-center">
                                <BsFillBuildingsFill />
                              </InputGroup.Text>
                              <Button className="bg-light" style={{ width: "90%" }} variant="white" onClick={() => setStaffLogin(true)}>
                                Company Staff
                              </Button>
                            </InputGroup>
                          </>
                        )}

                        <Button onClick={(e) => setTermsOfUse(true)} className="bg-transparent border-0 text-decoration-underline small text-muted">
                          Terms of Use
                        </Button>
                        <Button
                          onClick={(e) => {
                            setTermsOfUse(false);
                            setPrivacyPolicy(true);
                          }}
                          className="bg-transparent border-0 text-decoration-underline small text-muted ps-5"
                        >
                          Privacy Policy
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer type={"bg-secondary"} />
      </section>
    </>
  );
}

export default Login;
