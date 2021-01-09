import React, { Component } from 'react'
import Producto from './Producto';
import { Container, Row, Col } from 'reactstrap';
import {Modal, Button} from 'react-bootstrap'; 

class Resultados extends Component {
    mostrarResultados=()=>{
        const resultados=this.props.resultado;

        if (resultados.length === 0) return null;

        return(
            <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header style={{backgroundColor: '#BAE4FF'}} closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Reparaciones
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {resultados.map(resultado =>(
                    <ul>
                        <Producto
                            key={resultado.wId}
                            producto={resultado}
                            id={resultado.id}
                        />
                    </ul>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button  variant='success'>Add</Button>
                <Button variant='secondary'>Close</Button>
            </Modal.Footer>
        </Modal>
        )
    }
    render() {
        return (
            <React.Fragment>
            <div className="body col-12 p-5 row">
                {this.mostrarResultados()}
            </div>
            </React.Fragment>
        );
    }
}

export default Resultados;