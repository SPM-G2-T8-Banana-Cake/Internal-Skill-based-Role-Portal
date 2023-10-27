import React from "react";
import { hrDeleteRoleListing } from "../../../services/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteRoleModal(props) {
    console.log(props)
    const handleDelete = () => {
        hrDeleteRoleListing(props.role.Role_Listing_ID)
        .then(function(response) {
            console.log(response)
            props.openSnackbar('deleteRoleSuccess')
            props.reloadProfiles()
        })
        .catch(function(error) {
            console.log(error)
            props.openSnackbar('deleteRoleError')
        })
        props.setCurrentModal('details')
        props.setShow(false)
    }

    return (
        <Modal show onHide={() => props.setCurrentModal('details')} backdrop='static' keyboard={false}>
            <Modal.Header className="bg-details p-2 ps-3">
                <Modal.Title>Delete Role Listing</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <p>Are you sure you want to delete <span className="fw-bold">{props.role.Role_ID} - {props.role.Role_Name}</span>?</p>
                <i className="footerText">This action is <span className="fw-bold text-error">permanent</span>. </i>
            </Modal.Body>
            <Modal.Footer className="bg-light p-2">
                    <Button variant='secondary' size="sm" onClick={() => props.setCurrentModal('details')} className="rounded-pill me-1">
                        Cancel
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleDelete} className="rounded-pill">
                        Confirm
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteRoleModal;