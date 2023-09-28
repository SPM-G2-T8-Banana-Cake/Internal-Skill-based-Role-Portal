import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FiMoreVertical, FiEdit } from "react-icons/fi";

function ApplicantDetailsModal(props) {
  const [show, setShow] = useState(false);
//   const skill = props.skill;
  const staffName = props.staffName
  const [currentModal, setCurrentModal] = useState("details");
  const [skillsRequired, setSkillsRequired] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("Props", props)
  useEffect(() => {
    // for (let i=0; i < roleSkillData.length; i++) {
    //   if (roleName === roleSkillData[i].Role_Skill.Role_Name) {
    //     setSkillsRequired(roleSkillData[i].Role_Skill.Skill_Name)
    //   }
    // }
}, [])


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
            <Modal.Title>Applicant: {staffName}</Modal.Title>
            <OverlayTrigger placement="left" overlay={<Tooltip>Edit Role</Tooltip>}>
              <Button variant="bg-light" className="rounded-circle" onClick={() => setCurrentModal("modify")}>
                <FiEdit />
              </Button>
            </OverlayTrigger>
            <CloseButton variant="white" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <h3 className="">Applicant Details</h3>
            <hr/>
            <Row className="mb-4">
              <Col>
                <span className="fw-bold">Applicant Name</span>
                <br />
                <span>{staffName}</span>
              </Col>
            </Row>
            <Row className="mb-4">
            {/* <Col>
                <span className="fw-bold">Role Description</span>
                <br />
                <span>{props.role.Role_Desc}</span>
              </Col> */}
            </Row>
             <Row className="mb-3">
                    {/* <Col>
                        <span className="fw-bold">Skills Required</span>
                        <br />
                        <span>{skillsRequired}</span>
                    </Col> */}
              
                </Row>
          </Modal.Body>
          <Modal.Footer className="bg-light">{/* <Button className="rounded-pill me-3" variant="danger" size='sm' onClick={() => setCurrentModal('delete')}>
                        Delete Role Listing
                    </Button> */}</Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default ApplicantDetailsModal;
