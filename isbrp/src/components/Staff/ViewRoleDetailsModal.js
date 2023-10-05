import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import ModifyRoleModal from "./ModifyRoleModal";
import { FiMoreVertical } from "react-icons/fi";
import roleSkillData from "../../utils/DummyData/dummyRoleSkillData.json";

function ViewRoleDetailsModal(props) {
  const [show, setShow] = useState(false);
  const roleName = props.role.Role_Name;
  const [currentModal, setCurrentModal] = useState("details");
  const [skillsRequired, setSkillsRequired] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    for (let i = 0; i < roleSkillData.length; i++) {
      if (roleName === roleSkillData[i].Role_Skill.Role_Name) {
        setSkillsRequired(roleSkillData[i].Role_Skill.Skill_Name);
      }
    }
  }, [roleName]);

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
            <Modal.Title>Role: {props.role.Role_Name}</Modal.Title>
            <CloseButton variant="white" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
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
            <Row className="mb-5">
              <Col>
                <span className="fw-bold">Skills Required</span>
                <br />
                <span>{skillsRequired}</span>
              </Col>
            </Row>
            <h3>Role Skill Match</h3>
            <hr />
          </Modal.Body>
          <Modal.Footer className="bg-details">
            <Button className="rounded-pill me-3" variant="secondary" size="sm" onClick={() => setCurrentModal("apply")}>
              Apply for Role
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      {/* {currentModal === "modify" ? <ModifyRoleModal role={props.role} skillsRequired={skillsRequired} setCurrentModal={setCurrentModal} openSnackbar={props.openSnackbar} reloadProfiles={props.reloadProfiles} /> : null} */}
    </>
  );
}

export default ViewRoleDetailsModal;
