import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'; 

export default function ModalSuccess(props) {

    return (
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Estado
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{props.message}</p>
            
        </Modal.Body>
        <Modal.Footer>
            <button className="button is-success" type="submit" onClick={props.onHide}>Cerrar</button>
        </Modal.Footer>

    </Modal>
    )

}