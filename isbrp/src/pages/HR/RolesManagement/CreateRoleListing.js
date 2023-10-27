import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HrHeader from "../../../components/Header/HrHeader";
import Footer from "../../../components/Footer/Footer";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import bgHero from "../../../assets/heroImage.png";
import successBg from "../../../assets/createSuccessIcon.png";
import IsbrpSnackbar from "../../../components/Standard/isbrpSnackBar";
import { hrCreateRoleListing } from "../../../services/api";
import { departments } from "../../../utils/constants";

// Form validation
import { useFormik, Formik } from "formik";

// Form error checking
import * as Yup from "yup";

function CreateRoleListing() {
  const navigate = useNavigate();
  const data = useLocation();

  const [animation, setAnimation] = useState(false);
  const [timer, setTimer] = useState(5);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const initialValues = {
    roleName: "",
    roleDesc: "",
    dept: "",
    skillsRequired: "",
    appDeadline: "",
  };

  const validationSchema = Yup.object({
    roleName: Yup.string().required("Role Name is a required field"),
    roleDesc: Yup.string().required("Role Description is a required field"),
    dept: Yup.string().required("Department is a required field"),
    skillsRequired: Yup.string().required("Skills Required is a required field"),
    appDeadline: Yup.string().required("Application Deadline is a required field"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, errors) => {},
  });

  const handleSubmit = () => {
    formik.handleSubmit();

    if (Object.keys(formik.errors).length > 0 || formik.values.roleName === "" || formik.values.roleDesc === "" || formik.values.dept === "" || formik.values.appDeadline === "" || formik.values.skillsRequired === "") {
      openSnackbar("pageError");
    } else {
      let rolePosting = {};
      rolePosting["Role_Name"] = formik.values.roleName;
      rolePosting["Role_Desc"] = formik.values.roleDesc;
      rolePosting["Dept"] = formik.values.dept;
      rolePosting["Application_Deadline"] = formik.values.appDeadline;
      rolePosting["Skill_Name"] = formik.values.skillsRequired;

      hrCreateRoleListing(rolePosting)
        .then((response) => {
          window.scrollTo(0, 0);
          setSeverity("success");
          setMessage("Role listing created successfully.");
          setOpen(true);
          setAnimation(true);

          const interval = setInterval(() => {
            if (timer === 0) {
              clearInterval(interval);
            } else {
              setTimer((timer) => timer - 1);
            }
          }, 1000);

          setTimeout(() => {
            navigate("/roles-management", { state: { id: data.id } });
            setTimer(0);
          }, 5000);
        })

        .catch((error) => {
          console.error(error);
          setSeverity("error");
          setMessage("Something went wrong while creating role listing. Please try again.");
          setOpen(true);
        });
    }
  };

  const openSnackbar = (value) => {
    console.log(value);
    if (value === "pageError") {
      setSeverity("error");
      setMessage("Please check for errors and try again.");
      setOpen(true);
    }
  };

  useEffect(() => {
    document.title = "Create Role Listing";
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      document.getElementsByName(Object.keys(formik.errors)[0])[0].focus();
    }
  }, [formik.errors, formik.isSubmitting]);

  return (
    <>
      <HrHeader />
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
                Role Listing created
              </p>
              <p className="text-center fw-light" style={{ fontSize: "25px" }}>
                Redirecting you in <strong style={{ fontSize: "28px" }}>{timer}</strong> seconds...
                <br />
                <Image className="mx-auto" style={{ width: "600px" }} src={successBg} alt="Create Role Listing Success" fluid />
              </p>
            </div>
          </Container>
        </motion.div>
      ) : (
        <Container fluid className="contentBox bg-light h-100 p-0">
          <motion.div
            animate={{ x: "1px" }}
            style={{
              height: "200px",
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></motion.div>
          <div className="bg-details p-5" style={{ height: "160px" }}>
            <h3 style={{ fontWeight: "bold" }}>Role Listing Creation</h3>
            <h6 style={{ fontWeight: "lighter" }}>Fill the form below accurately to create a new role listing.</h6>
          </div>
          <div className="personalParticulars">
            <h3 className="text-center mt-5" style={{ fontWeight: "normal" }}>
              Role Listing Details
            </h3>
            <Formik validateOnChange={false} and validateOnBlur={false}>
              <motion.div animate={{ x: "5px" }} className="inputFields box-shadow p-5 d-flex justify-content-center mx-auto">
                <Form autoComplete="off" onSubmit={formik.handleSubmit} style={{ width: "750px" }}>
                  <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="roleName">
                        <Form.Label>
                          Role Name&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control className="bg-background p-2" name="roleName" type="text" placeholder="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.roleName} />
                        {formik.touched.roleName && formik.errors.roleName ? <p className="text-error">{formik.errors.roleName}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="roleDesc">
                        <Form.Label>
                          Role Description&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control className="bg-background p-2" name="roleDesc" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.roleDesc} />
                        {formik.touched.roleDesc && formik.errors.roleDesc ? <p className="text-error">{formik.errors.roleDesc}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="roleDesc">
                        <Form.Label>
                          Department&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Select className="bg-background p-2" name="dept" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dept}>
                          <option value="">--- Select a department ---</option>
                          {departments.map((department) => {
                            return (
                              <option key={department} value={department}>
                                {department}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.touched.dept && formik.errors.dept ? <p className="text-error">{formik.errors.dept}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="skillsRequired">
                        <Form.Label>
                          Skills Required&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <textarea className="bg-background form-control p-2" name="skillsRequired" placeholder="Enter various skills required separated by ','" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.skillsRequired} />
                        {formik.touched.skillsRequired && formik.errors.skillsRequired ? <p className="text-error">{formik.errors.skillsRequired}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="appDeadline">
                        <Form.Label>
                          Application Deadline&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control className="bg-background p-2" name="appDeadline" type="date" min={new Date().toJSON().slice(0, 10)} max="" placeholder="dd-mm-yy" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.appDeadline} />
                        {formik.touched.appDeadline && formik.errors.appDeadline ? <p className="text-error">{formik.errors.appDeadline}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row className="mx-auto p-3">
                    <Col className="mx-5">
                      <Form.Group className="mb-3" controlId="desiredIndustry">
                        <Form.Label>
                          Required Skill Sets&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Select
                          isMulti
                          id="desiredIndustry"
                          name="desiredIndustry"
                          // options={newIndustryList}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              // dropdownIndicator: 'red',
                              // borderColor: state.isFocused ? 'grey' : 'red',
                              color: state.isFocused ? "" : "black",
                              backgroundColor: state.isFocused ? "" : "#DFDFDF",
                            }),
                          }}
                          placeholder="--- Select up to 3 desired industries ---"
                          value={formik.values.desiredIndustry}
                          onBlur={formik.handleBlur}
                          isOptionDisabled={() => formik.values.desiredIndustry.length >= 3}
                          onChange={(selectedIndustry) => formik.setFieldValue("desiredIndustry", selectedIndustry)}
                        />
                        {formik.touched.desiredIndustry && formik.errors.desiredIndustry ? <p className="text-error">{formik.errors.desiredIndustry}</p> : null}
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row className="mx-auto px-3">
                    <Col className="mx-5">
                      <hr />
                      <Button
                        className="bg-details"
                        style={{
                          float: "right",
                          color: "black",
                          fontWeight: "bold",
                          borderStyle: "none",
                          borderRadius: "5px",
                        }}
                        onClick={(e) => handleSubmit(e)}
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
      <Footer type="bg-secondary" />
      <IsbrpSnackbar open={open} setOpen={setOpen} severity={severity} message={message} />
    </>
  );
}

export default CreateRoleListing;
