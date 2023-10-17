import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ModifyRoleModal from "./ModifyRoleModal";
import bgIcon from "../../../assets/viewingIcon.png";
import { FiMoreVertical, FiEdit, FiClock } from "react-icons/fi";

function RoleDetailsModal(props) {
  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState("details");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

  return (
    <>
      <OverlayTrigger className="bg-light" placement="top" overlay={<Tooltip>View Role Details</Tooltip>}>
        <Button className="rounded-circle" size="sm" variant="grey" onClick={handleShow}>
          <FiMoreVertical />
        </Button>
      </OverlayTrigger>

      {currentModal === "details" ? (
        <Modal show={show} fullscreen={"lg-down"} size="lg" onHide={handleClose}>
          <Modal.Header className="bg-details text-dark p-2 px-4">
            <Modal.Title>
              <small>
                {props.role.Role_ID}: {props.role.Role_Name}
              </small>
            </Modal.Title>
            <OverlayTrigger placement="left" overlay={<Tooltip>Edit Role</Tooltip>}>
              <Button variant="bg-light" className="rounded-circle" onClick={() => setCurrentModal("modify")}>
                <FiEdit />
              </Button>
            </OverlayTrigger>
            <CloseButton variant="white" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 bg-light" style={{backgroundImage: `url(${bgIcon})`}}>
            <h3 className="">Role Details</h3>
            <hr />
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Role Name</span>
                <br />
                <span>{props.role.Role_Name}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Role Description</span>
                <br />
                <span>{props.role.Role_Desc}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Department</span>
                <br />
                <span>{props.role.Dept}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Skills Required</span>
                <br />
                <span>{props.role.Required_Skills}</span>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Application Deadline</span>
                <br />
                <span><FiClock /> {props.role.Application_Deadline.split(",").slice(0, 2).join(" ").split(" ").slice(0, 5).join(" ")}</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="bg-light">{/* <Button className="rounded-pill me-3" variant="danger" size='sm' onClick={() => setCurrentModal('delete')}>
                        Delete Role Listing
                    </Button> */}</Modal.Footer>
        </Modal>
      ) : null}
      {currentModal === "modify" ? <ModifyRoleModal role={props.role} setCurrentModal={setCurrentModal} openSnackbar={props.openSnackbar} reloadRoleListings={props.reloadRoleListings} /> : null}
    </>
  );
}

export default RoleDetailsModal;
