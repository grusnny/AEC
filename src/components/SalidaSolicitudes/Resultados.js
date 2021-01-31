import React, { Component } from 'react'
import Producto from './Producto';
import 'bootstrap/dist/css/bootstrap.min.css';

class Resultados extends Component {
    mostrarResultados=()=>{
        const resultados=this.props.resultado;

        if (resultados.length === 0) return null;

        return(

                <div className="col-16 p-5 row">
                {resultados.map((resultado, index) =>
                    <div key={index}>
                        <Producto
                            key={resultado.rId}
                            producto={resultado}
                            id={resultado.id}
                        />
                    </div>
                )}
                </div>

        )
    }
    render() {
        return (
            <div className="body col-12 p-5 row">
                {this.mostrarResultados()}
            </div>
        );
    }
}

export default Resultados;