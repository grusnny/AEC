import React, {Component} from 'react';
import './card-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Producto extends Component{
    handleClick=(e,id)=>{
        e.preventDefault();
        //this.props.obtenerProducto(id);
    }
    render(){

    const {wId,
        wTel,
        uId,
        wMail,
        wName,
        wPhoto,
        wProfession}=this.props.producto;
        
        return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-12 mb-4" >
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{wName}</p>
                            <p class="subtitle is-6">{wMail}</p>

                        </div>
                        </div>

                        <div class="content">
                        <strong>Profesión: {wProfession}</strong>
                        <br/>
                        <strong>Telefono: {wTel}</strong>
                        <br/>
                        <br/>
                        <div align="center">
                        <button className="button is-primary is-rounded "  onClick={this.handleClick}>
                                <strong>Contactar</strong>
                        </button>
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Producto;