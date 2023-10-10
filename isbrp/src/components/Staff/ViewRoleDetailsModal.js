import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FiMoreVertical } from "react-icons/fi";
import Chip from "@mui/material/Chip";
import bgIcon from "../../assets/viewingIcon.png";

function ViewRoleDetailsModal(props) {
  const [show, setShow] = useState(false);
  const currentModal = "details";
  const [appStatus, setAppStatus] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = [
    { label: "Group A", value: 500, color: "#0088FE" },
    { label: "Group B", value: 300, color: "#00C49F" },
    { label: "Group C", value: 300, color: "#FFBB28" },
    { label: "Group D", value: 200, color: "#FF8042" },
  ];

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const handleApplication = () => {
    props.openSnackbar("applyRoleSuccess");
    setAppStatus("success");
  };

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
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
                <span>{props.role.Skills}</span>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <span className="fw-bold">Application Deadline</span>
                <br />
                <span>{props.role.Application_Deadline.split(",").slice(0, 2).join(" ").split(" ").slice(0, 5).join(" ")}</span>
              </Col>
            </Row>
            <h3>Role Skill Match</h3>
            <hr />
            <PieChart
              series={[
                {
                  outerRadius: 80,
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
              {...sizing}
            />
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
