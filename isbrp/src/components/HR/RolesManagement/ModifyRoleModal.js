import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
// import Select from 'react-select'

function ModifyRoleModal(props) {
  // Form Values
  const [roleName, setRoleName] = useState(props.role.Role_Name);
  const [roleDesc, setRoleDesc] = useState(props.role.Role_Desc);

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);

  const handleCancel = () => {
    setValidated(false);
    props.setCurrentModal("details");
  };

  const handleSubmit = () => {};

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
          <Modal.Title className="me-2">Edit Role: {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 bg-light">
          <h4 className="mb-4">Role Name</h4>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Control type="text" defaultValue={roleName} className="bg-inputFields" onChange={(e) => setRoleName(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h4 className="mb-4">Role Description</h4>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Control type="text" defaultValue={roleDesc} className="bg-inputFields" onChange={(e) => setRoleDesc(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Please fill this in.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>{error ? <Alert variant="danger">Please clear the above errors.</Alert> : null}</Row>
        </Modal.Body>
        <Modal.Footer className="bg-grey">
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
