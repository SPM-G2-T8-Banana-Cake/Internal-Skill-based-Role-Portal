import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";
import logo from "../../assets/logo.png";

function Footer(props) {
  return (
    <Navbar className={"bg-footer d-flex justify-content-between align-items-center py-1 text-white footerText"}>
      <Row className="mx-5">
        <Col style={{ width: "50vw" }} className="my-auto">
          <div>
            <Image width="80px" src={logo} alt="Brand Icon" />
            <span className="d-inline-block">© 2023 All-In-One, Inc. All rights reserved.</span>
          </div>
        </Col>
        <Col style={{ width: "50vw" }} className="text-end my-auto">
          <p className="footerTitles mb-0">
            Data Protection Officer: &nbsp;
            <small className="fw-normal">enquiry@allinone.com.sg</small>
          </p>
        </Col>
      </Row>
    </Navbar>
  );
}

export default Footer;
