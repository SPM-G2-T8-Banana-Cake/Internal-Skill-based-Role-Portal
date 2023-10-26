import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FiMoreVertical } from "react-icons/fi";
import bgIcon from "../../../assets/viewingApplicantIcon.png";

function ApplicantDetailsModal(props) {
  const [show, setShow] = useState(false);
  const currentModal = "details";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

  return (
    <>
      <OverlayTrigger className="bg-light" placement="top" overlay={<Tooltip>View Applicant Details</Tooltip>}>
        <Button className="rounded-circle" size="sm" variant="background" onClick={handleShow}>
          <FiMoreVertical />
        </Button>
      </OverlayTrigger>

      {currentModal === "details" ? (
        <Modal show={show} fullscreen={"lg-down"} size="lg" onHide={handleClose}>
          <Modal.Header className="bg-details text-dark p-2 px-4">
            <Modal.Title>Applicant: {props.applicant.Staff_Name}</Modal.Title>
            <CloseButton variant="white" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 bg-light" style={{ backgroundSize: "300px", backgroundRepeat: "no-repeat", backgroundPosition: "bottom right", backgroundImage: `url(${bgIcon})` }}>
            <h3 className="">Application Details</h3>
            <hr />
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Applicant Name</span>
                <br />
                <span>{props.applicant.Staff_Name}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Skills</span>
                <br />
                <span>{props.applicant.Staff_Skills}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Role Applied</span>
                <br />
                <span>{props.applicant.Role_Name}</span>
              </Col>
            </Row>
            <Row className="mb-4 w-75">
              <Col>
                <span className="fw-bold">Role Description</span>
                <br />
                <span>{props.applicant.Role_Desc}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Role Skills Required</span>
                <br />
                <span>{props.applicant.Staff_Skills}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="bg-light"></Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default ApplicantDetailsModal;
