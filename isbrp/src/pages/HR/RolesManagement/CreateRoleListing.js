import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import HrHeader from "../../../components/Header/HrHeader";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import Footer from "../../../components/Footer/Footer";
import Form from 'react-bootstrap/Form'
import Image from "react-bootstrap/esm/Image";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { motion } from "framer-motion";
import bgHero from "../../../assets/heroImage.png";

// Form validation
import { useFormik, Formik } from "formik";

// Form error checking
import * as Yup from "yup";

function CreateRoleListing() {
    const [animation, setAnimation] = useState(false);
    const [timer, setTimer] = useState(5);

    const initialValues = {
      jobID: "",
      jsID: "",
      jobPosition: "",
      pcCompanyName: "",
      pcContactName: "",
      pcContactNumber: "",
      pcEmail: "",
      jsName: "",
      jsEmail: "",
      jsNumber: "",
      reason: "",
      applicationType: "External",
    };
  
    const validationSchema = Yup.object({
      company: Yup.string().required("Company Name is a required field"),
      position: Yup.string().required("Position is a required field"),
    });
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, errors) => {},
    });

    
    useEffect(() => {
        document.title = "Create Role Listing";

    }, [])

    return (
        <>
        <HrHeader/>
        {animation ? (
            <motion.div
              className="animate-success h-100"
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Container
                fluid
                className="bg-hero"
                style={{
                  marginTop: "59.58px",
                  minHeight: "100vh",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="message-box" style={{ paddingTop: "15vh" }}>
                  <p className="text-center" style={{ fontSize: "60px" }}>
                    Job Application created
                  </p>
                  <p className="text-center fw-light" style={{ fontSize: "25px" }}>
                    Redirecting you in{" "}
                    <strong style={{ fontSize: "28px" }}>{timer}</strong> seconds...
                    <br />
                    <Image
                      className="mx-auto"
                      style={{ width: "600px" }}
                      src={bgHero}
                      alt="Create Application Success Background"
                      fluid
                    />
                  </p>
                </div>
              </Container>
            </motion.div>
          ) : (

                   <Container fluid className="contentBox bg-light h-100 p-0">
          <motion.div   animate={{ x: "1px" }}
          style={{
            
          height: "200px",
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}></motion.div>
          <div className="bg-inputFields p-5" style={{ height: "160px" }}>
        <h3 style={{ fontWeight: "bold" }}>Role Listing Creation</h3>
        <h6 style={{ fontWeight: "lighter" }}>
          Fill the form below accurately.
        </h6>
        </div>
          <div className="personalParticulars">
            <h3 className="text-center mt-5" style={{ fontWeight: "normal" }}>
              Role Details
            </h3>
            <Formik validateOnChange={false} and validateOnBlur={false}>
              <motion.div animate={{x: '5px'}} className="inputFields box-shadow p-5 d-flex justify-content-center mx-auto">
                <Form
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  style={{ width: "750px" }}
                >
               
               <Row className="mx-auto p-3">
                  <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="dateOfBirth">
                        <Form.Label>
                          Role Name&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          className="bg-grey p-2"
                          name="dateOfBirth"
                          type="text"
                          placeholder=""
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dateOfBirth}
                        />
                        {formik.touched.dateOfBirth &&
                        formik.errors.dateOfBirth ? (
                          <p className="text-error">
                            {formik.errors.dateOfBirth}
                          </p>
                        ) : null}
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="dateOfBirth">
                        <Form.Label>
                          Role Description&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          className="bg-grey p-2"
                          name="dateOfBirth"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dateOfBirth}
                        />
                        {formik.touched.dateOfBirth &&
                        formik.errors.dateOfBirth ? (
                          <p className="text-error">
                            {formik.errors.dateOfBirth}
                          </p>
                        ) : null}
                      </Form.Group>
                    </Col>
                    </Row>
                    <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="dateOfBirth">
                        <Form.Label>
                          Application Deadline&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          className="bg-grey p-2"
                          name="dateOfBirth"
                          type="date"
                          min="01-01-1920"
                          max="12-31-2023"
                          placeholder="dd-mm-yy"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.dateOfBirth}
                        />
                        {formik.touched.dateOfBirth &&
                        formik.errors.dateOfBirth ? (
                          <p className="text-error">
                            {formik.errors.dateOfBirth}
                          </p>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="phoneNumber">
                        <Form.Label>
                          Phone Number&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="bg-grey"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phoneNumber}
                          maxLength={8}
                        />
                        {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? (
                          <p className="text-error">
                            {formik.errors.phoneNumber}
                          </p>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>


                  <Row className="mx-auto px-3">
                    <Col className="mx-5">
                      <hr />
                      <Button
                        className="bg-button"
                        style={{
                          float: "right",
                          color: "black",
                          fontWeight: "bold",
                          borderStyle: "none",
                          borderRadius: "5px",
                        }}
                        // onClick={(e) => handleForm1(e)}
                      >
                        Create Role Listing
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            </Formik>
          </div>
        </Container>
    )}
    </>
    )
}

export default CreateRoleListing;