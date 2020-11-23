import React, { Component } from 'react'
import Producto from './Producto';
import { Container, Row, Col } from 'reactstrap';

class Resultados extends Component {
    mostrarResultados=()=>{
        const resultados=this.props.resultado;

        if (resultados.length === 0) return null;

        return(
            <Container className='text-center'>
                        {resultados.map(resultado =>(
                            <ul>
                                <Producto
                                    key={resultado.wId}
                                    producto={resultado}
                                    id={resultado.id}
                                />
                            </ul>
                        ))}
            </Container> 
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