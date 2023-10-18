import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiMoreVertical, FiClock } from "react-icons/fi";
import Chip from "@mui/material/Chip";
import bgIcon from "../../assets/viewingIcon.png";
import { staffCreateRoleApplication } from "../../services/api";

function ViewRoleDetailsModal(props) {
  console.log("Props", props)
  const [show, setShow] = useState(false);
  const currentModal = "details";
  const [appStatus, setAppStatus] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const requiredSkills = props.role.Required_Skills.includes(",") ? props.role.Required_Skills.split(",") : [props.role.Required_Skills];
  // console.log("requiredskills", requiredSkills)


  // const staffSkills = props.staffSkills[0].includes(",") ? props.staffSkills.split(",") : [props.staffSkills];
  // console.log("staffskills", staffSkills)
  // var matched = 0;
  // var matchedArray = [];

  // if(staffSkills !== undefined) {
  //   staffSkills[0].map((staffSkill) => {
  //     if (requiredSkills.includes(staffSkill)) {
  //       matched += 1;
  //       matchedArray.push(staffSkill);
  //     }
  //     return [matched, matchedArray];
  //   });
  // }

  // const roleSkillMatch = (matched / requiredSkills.length) * 100;

  const handleApplication = () => {
    let data = {};
    data["Role_Listing_ID"] = props.role.Role_Listing_ID;
    data["Applicant_ID"] = props.staff;

    console.log(data);
    staffCreateRoleApplication(data)
      .then((response) => {
        console.log(response);
        setAppStatus("success");
        props.openSnackbar("createApplicationSuccess");
      })

      .catch((error) => {
        console.error(error);
        props.openSnackbar("createApplicationError");
      });
  };

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
            <Modal.Title>Role: {props.role.Role_Name}</Modal.Title>
            {appStatus === "success" ? <Chip className="bg-success text-dark ms-2 p-1 float-end" label="Applied" color="primary" variant="outlined" /> : null}

            <CloseButton variant="white" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="p-4 bg-light" style={{ backgroundImage: `url(${bgIcon})` }}>
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
            <Row className="mb-5">
              <Col>
                <span className="fw-bold">Application Deadline</span>
                <br />
                <span>
                  <FiClock /> {props.role.Application_Deadline.split(",").slice(0, 2).join(" ").split(" ").slice(0, 5).join(" ")}
                </span>
              </Col>
            </Row>
            <h3>Role Skill Match</h3>
            <hr />
            <Row className="mb-5">
              {/* <Col>
                <div className="w-50">
                  <CircularProgressbar value={roleSkillMatch} text={`${roleSkillMatch}%`} />
                </div>
              </Col> */}
              {/* <Col>
                <span className="fw-bold">Your Skills</span>
                <br />
                <ul>
                  {staffSkills.map((staffSkill, index) => {
                    return <li key={index}>{staffSkill}</li>;
                  })}
                </ul>
              </Col>
              <Col>
                <span className="fw-bold">Matched Skills ✔️</span>
                <br />
                <ul>
                  {matchedArray.length === 0 ? (
                    <>-</>
                  ) : (
                    matchedArray.map((matchedSkill, index) => {
                      return <li key={index}>{matchedSkill}</li>;
                    })
                  )}
                </ul>
              </Col> */}
            </Row>
          </Modal.Body>
          <Modal.Footer className="bg-details">
            {appStatus === "success" ? (
              <Button className="rounded-pill me-3" variant="secondary" size="sm" disabled>
                Successfully Applied
              </Button>
            ) : (
              <Button className="rounded-pill me-3" variant="secondary" size="sm" onClick={handleApplication}>
                Apply for Role
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default ViewRoleDetailsModal;
