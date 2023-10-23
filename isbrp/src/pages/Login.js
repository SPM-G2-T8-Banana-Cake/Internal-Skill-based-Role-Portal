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
import { ThreeDots } from "react-loader-spinner";

import { BsPersonFillGear, BsFillBuildingsFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { staffCreateAccount, staffLoginAccount, hrLoginAccount, hrCreateAccount } from "../services/api.js";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hrLogin, setHrLogin] = useState(false);
  const [staffLogin, setStaffLogin] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [hrUsername, setHrUsername] = useState("");
  const [hrPassword, setHrPassword] = useState("");
  const [hrRegisterUsername, setHrRegisterUsername] = useState("");
  const [hrRegisterPassword, setHrRegisterPassword] = useState("");
  const [staffRegisterUsername, setStaffRegisterUsername] = useState("");
  const [staffRegisterPassword, setStaffRegisterPassword] = useState("");
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [HrRegister, setHrRegister] = useState(false);
  const [staffRegister, setStaffRegister] = useState(false);

  const handleStaffLoginEnter = (value) => {
    if (value === "Enter") {
      handleStaffLogin();
    }
  };

  const handleStaffRegisterEnter = (value) => {
    if (value === "Enter") {
      handleStaffRegister();
    }
  };

  const handleHrLoginEnter = (value) => {
    if (value === "Enter") {
      handleHRLogin();
    }
  };

  const handleHrRegisterEnter = (value) => {
    if (value === "Enter") {
      handleHRRegister();
    }
  };

  const handleHRLogin = () => {
    let errors = [];
    if (hrUsername.length === 0) {
      errors.push("Username is missing.");
    }
    if (hrPassword.length === 0) {
      errors.push("Password is missing.");
    }

    setErrors(errors);

    if (errors.length === 0) {
      setLoading(true);
      staffLoginAccount({ username: hrUsername, password: hrPassword })
        .then(function (response) {
          console.log("HR Login Account Endpoint Called");
          console.log(response);
          localStorage.setItem("id", hrUsername);
          localStorage.setItem("token", "test-token");
          localStorage.setItem("userType", "hr");
          navigate("/hr-home", { state: { id: hrUsername } });
        })
        .catch(function (error) {
          console.log(error);
          setMessage("");
          setErrors(["Something went wrong with login."]);
        });
      setLoading(false);
    }
  };

  const handleStaffLogin = () => {
    let errors = [];
    if (staffLogin.length === 0) {
      errors.push("Username is missing.");
    }
    if (staffPassword.length === 0) {
      errors.push("Password is missing.");
    }

    setErrors(errors);

    if (errors.length === 0) {
      setLoading(true);
      staffLoginAccount({ username: staffUsername, password: staffPassword })
        .then(function (response) {
          console.log("Staff Login Account Endpoint Called");
          console.log(response);
          if (response.data === "Exist"){
          localStorage.setItem("id", staffUsername);
          localStorage.setItem("token", "test-token");
          localStorage.setItem("userType", "staff");
          navigate("/staff-home", { state: { id: staffUsername } });
          }
          else {
            setErrors(["Something went wrong with login."]);
          }
        })
        .catch(function (error) {
          console.log(error);
          setMessage("");
          setErrors(["Something went wrong with login."]);
        });
      setLoading(false);
    }
  };

  const handleStaffRegister = () => {
    let errors = [];
    if (staffRegisterUsername.length === 0) {
      errors.push("Username is missing.");
    }
    if (staffRegisterPassword.length === 0) {
      errors.push("Password is missing.");
    }

    setErrors(errors);

    if (errors.length === 0) {
      setMessage("Login successful. Redirecting you ...");
      setLoading(true);
      staffCreateAccount({ Username: staffRegisterUsername, Password: staffRegisterPassword })
        .then(function (response) {
          console.log("Staff Create Account Endpoint Called");
          console.log(response);
          setMessage("Successfully created an account. Please login.")
          setStaffLogin(true);
          setStaffRegister(false);
          setStaffUsername(staffRegisterUsername);
          setStaffPassword(staffRegisterPassword);
        })
        .catch(function (error) {
          console.log(error);
          setErrors(["Something went wrong with creating an account. A user with the username already exists."]);
        });
      setLoading(false);
    }

    // if (username.includes("st") && password === "password") {
    //   localStorage.setItem("id", username);
    //   localStorage.setItem("userType", "staff");
    //   localStorage.setItem("token", "test-token");
    //   navigate("/staff-home", { state: { id: username } });
    //   setError(false);
    // } else {
    //   setError(true);
    // }
  };

  const handleHRRegister = () => {
    let errors = [];
    if (hrRegisterUsername.length === 0) {
      errors.push("Username is missing.");
    }
    if (hrRegisterPassword.length === 0) {
      errors.push("Password is missing.");
    }

    setErrors(errors);

    if (errors.length === 0) {
      setLoading(true);
      hrCreateAccount({ Username: hrRegisterUsername, Password: hrRegisterPassword })
        .then(function (response) {
          console.log("HR Create Account Endpoint Called");
          console.log(response);
          setMessage("Successfully created an account. Please login.")
          setHrLogin(true);
          setHrRegister(false);
          setHrUsername(hrRegisterUsername);
          setHrPassword(hrRegisterPassword);
        })
        .catch(function (error) {
          console.log(error);
          setErrors(["Something went wrong with creating an account. A user with the username already exists."]);
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

console.log("Errors", errors)
  return (
    <>
      <LoginHeader />
      <section className="mx-auto vh-100 bg-grey">
        <Container className="h-100 w-100">
          <Row className="row d-flex justify-content-center align-items-center mt-4 h-100">
            <Col className="col  col-md-12 col-xl-12">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <Row className="row g-0">
                  <Col className="col-md-6 col-lg-6 d-none d-md-block">
                    <Image src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"} alt="Login Hero" className="h-100" fluid style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </Col>
                  <Col className="col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form>
                        <img src={logo} className="w-100 mb-4 mx-1" alt="Brand Logo" fluid style={{ borderRadius: "1rem 0 0 1rem" }} />
                        {HrRegister ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setHrRegister(false);
                                    setHrLogin(true);
                                    setError("");
                                    setErrors([]);
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Register an account
                              </h5>
                              <br />
                              <br />
                              <Form.Label className="fw-bold">HR Username</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={hrRegisterUsername} onChange={(e) => setHrRegisterUsername(e.target.value)} onKeyDown={(e) => handleHrRegisterEnter(e.key)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">HR Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={hrRegisterPassword} onChange={(e) => setHrRegisterPassword(e.target.value)} onKeyDown={(e) => handleHrRegisterEnter(e.key)} type="password" />
                            </Form.Group>
                            {errors.length !== 0 ? (
                              <Alert variant="danger">
                                <ul>
                                  {errors.map((err) => {
                                    return <li>{err}</li>;
                                  })}
                                </ul>
                              </Alert>
                            ) : errors.length === 1 ? (
                              <Alert variant="danger">
                                <p>{errors[0]}</p>
                              </Alert>
                            ) : null}
                            {message ?  <Alert variant="success">{message}</Alert> : null }
                            <div className="text-end">
                              <Button variant="details" onClick={handleHRRegister}>
                                Register
                              </Button>
                            </div>
                          </>
                        ) : staffRegister ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setStaffRegister(false);
                                    setStaffLogin(true);
                                    setError("");
                                    setErrors([]);
                                  }}
                                >
                                  <FiArrowLeft />
                                </Button>
                              </OverlayTrigger>
                              &nbsp;
                              <h5 class="d-inline fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                                Register an account
                              </h5>
                              <br />
                              <br />
                              <Form.Label className="fw-bold">Staff Username</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={staffRegisterUsername} onChange={(e) => setStaffRegisterUsername(e.target.value)} onKeyDown={(e) => handleStaffRegisterEnter(e.key)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">Staff Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={staffRegisterPassword} onChange={(e) => setStaffRegisterPassword(e.target.value)} onKeyDown={(e) => handleStaffRegisterEnter(e.key)} type="password" />
                            </Form.Group>
                            {errors.length !== 0 ? (
                              <Alert variant="danger">
                                <ul>
                                  {errors.map((err) => {
                                    return <li>{err}</li>;
                                  })}
                                </ul>
                              </Alert>
                            ) : errors.length === 1 ? (
                              <Alert variant="danger">
                                <p>{errors[0]}</p>
                              </Alert>
                            ) : null}
                            <div className="text-end">
                              <Button variant="details" onClick={handleStaffRegister}>
                                Register
                              </Button>
                            </div>
                          </>
                        ) : termsOfUse ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Login</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setTermsOfUse(false);
                                    setErrors([]);
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
                                    setErrors([]);
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
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Roles</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setHrLogin(false);
                                    setStaffLogin(false);
                                    setError("");
                                    setErrors([]);
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
                              <Form.Control className="bg-grey" defaultValue={hrUsername} onChange={(e) => setHrUsername(e.target.value)} onKeyDown={(e) => handleHrLoginEnter(e.key)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">HR Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={hrPassword} onChange={(e) => setHrPassword(e.target.value)} onKeyDown={(e) => handleHrLoginEnter(e.key)} type="password" />
                            </Form.Group>
                            {message ?  <Alert variant="success">{message}</Alert> : null }
                            {error ? <Alert variant="danger">Username or password is incorrect. Please try again.</Alert> : null}
                            <span className="text-start fw-light">Don't have an account? Sign up </span>
                            <Button
                              className="ms-0 ps-0 text-dark my-auto py-auto border-0 text-decoration-underline bg-transparent"
                              onClick={() => {
                                setHrRegister(true);
                                setHrLogin(false);
                                setError("");
                              }}
                            >
                              here
                            </Button>
                            <div className="text-end">
                              <Button variant="details" onClick={handleHRLogin}>
                                Login
                              </Button>
                            </div>
                          </>
                        ) : staffLogin ? (
                          <>
                            <Form.Group className="mt-2 mb-3">
                              <OverlayTrigger placement="top" overlay={<Tooltip>Back to Roles</Tooltip>}>
                                <Button
                                  variant="light"
                                  className="rounded-circle me-1 d-inline"
                                  onClick={() => {
                                    setHrLogin(false);
                                    setStaffLogin(false);
                                    setError("");
                                    setErrors([]);
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
                              <Form.Control className="bg-grey" defaultValue={staffUsername} onChange={(e) => setStaffUsername(e.target.value)} onKeyDown={(e) => handleStaffLoginEnter(e.key)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold">Staff Password</Form.Label>
                              <Form.Control className="bg-grey" defaultValue={staffPassword} onChange={(e) => setStaffPassword(e.target.value)} onKeyDown={(e) => handleStaffLoginEnter(e.key)} type="password" />
                            </Form.Group>
                            {error ? <Alert variant="danger">Username or password is incorrect. Please try again.</Alert> : null}
                            {message ?  <Alert variant="success">{message}</Alert> : null }
                            <span className="text-start fw-light">Don't have an account? Sign up </span>
                            <Button
                              className="p-0 m-0 text-dark py-auto border-0 text-decoration-underline bg-transparent"
                              onClick={() => {
                                setStaffRegister(true);
                                setStaffLogin(false);
                                setError("");
                              }}
                            >
                              here
                            </Button>
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
