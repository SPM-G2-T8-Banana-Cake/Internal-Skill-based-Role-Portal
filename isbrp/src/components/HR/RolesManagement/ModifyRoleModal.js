import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { departments } from "../../../utils/constants";
import { hrUpdateRoleListing } from "../../../services/api";

function ModifyRoleModal(props) {
  const roleID = props.role.Role_ID;
  const roleListingID = props.role.Role_Listing_ID;
  const [roleName, setRoleName] = useState(props.role.Role_Name);
  const [roleDesc, setRoleDesc] = useState(props.role.Role_Desc);
  const skillsRequired = (props.role.Required_Skills);
  const [appDeadline, setAppDeadline] = useState(props.role.Application_Deadline);
  const [department, setDepartment] = useState(props.role.Dept);

  const month = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const structuredDate = props.role.Application_Deadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[2] + "-" + month[props.role.Application_Deadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[1]] + "-" + props.role.Application_Deadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[0];
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);

  const handleCancel = () => {
    setValidated(false);
    props.setCurrentModal("details");
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      setError(true);
    } else {
      setError(false);

      if (appDeadline.includes(",")) {
        var localAppDeadline = appDeadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[2] + "-" + month[appDeadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[1]] + "-" + appDeadline.split(",").slice(1, 2)[0].split(" ").slice(1, 4)[0];
      } else {
        localAppDeadline = appDeadline;
      }

      let modifiedData = {
        Role_ID: roleID,
        Role_Listing_ID: roleListingID,
        Role_Name: roleName,
        Role_Desc: roleDesc,
        Skills: skillsRequired,
        Application_Deadline: localAppDeadline,
        Dept: department,
      };
      console.log(modifiedData);
      hrUpdateRoleListing(modifiedData)
        .then(function (response) {
          console.log(response);
          props.reloadRoleListings();
          props.setCurrentModal("details");
          props.openSnackbar("modifyRoleSuccess");
        })
        .catch(function (error) {
          console.log(error);
          props.openSnackbar("modifyRoleError");
        });
    }
    setValidated(true);
  };

  useEffect(() => {}, []);

  return (
    <Modal show fullscreen={"lg-down"} size="lg" onHide={() => props.setCurrentModal("details")} backdrop="static" keyboard={false}>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Modal.Header className="bg-details text-black p-2 ps-4">
          <Modal.Title className="me-2">Edit Role: {roleName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 bg-light">
          <h3 className="mb-4">Role Details</h3>
          <hr />
          <Row className="mb-4">
            <Col>
              <span className="fw-bold">Role Name</span>
              <br />
              <Form.Group controlId="roleName">
                <Form.Control type="text" defaultValue={roleName} className="bg-background" onChange={(e) => setRoleName(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <span className="fw-bold">Role Description</span>
              <br />
              <Form.Group controlId="roleDesc">
                <textarea className="form-control w-100 bg-background" rows="3" defaultValue={roleDesc} onChange={(e) => setRoleDesc(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <span className="fw-bold">Department</span>
              <br />
              <Form.Group controlId="dept">
                <Form.Select defaultValue={department} className="bg-background" onChange={(e) => setDepartment(e.target.value)} required>
                  {departments.map((department) => {
                    return <option key={department}>{department}</option>;
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <span className="fw-bold">Skills Required</span>
              <br />
              <Form.Group controlId="skillsRequired">
                <p className="bg-background rounded p-2 ps-2">{skillsRequired}</p>
                {/* <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <span className="fw-bold">Application Deadline</span>
              <br />
              <Form.Group controlId="appDeadline">
                <Form.Control type="date" defaultValue={structuredDate} className="bg-background" min={new Date().toJSON().slice(0, 10)} onChange={(e) => setAppDeadline(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>{error ? <Alert variant="danger">Please clear the above errors.</Alert> : null}</Row>
        </Modal.Body>
        <Modal.Footer className="bg-details">
          <Button variant="secondary" type="button" onClick={handleCancel} className="rounded-pill me-1" size="sm">
            Cancel
          </Button>
          <Button variant="secondary" type="submit" className="rounded-pill me-3" size="sm">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModifyRoleModal;
