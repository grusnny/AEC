import React, {Component} from 'react';
import './card-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MD5 from 'crypto-js/md5';

class Producto extends Component{
    handleClick=(e,id)=>{
        e.preventDefault();
        //this.props.obtenerProducto(id);
    }
    render(){

    const {wId,
        rPrice,
        wTel,
        uId,
        wMail,
        wName,
        wPhoto,
        wProfession}=this.props.producto;

    var user = "Necito user";
    var hash = MD5("4Vj8eK4rloUd272L48hsrarnUA~508029~Ayudaencasa~"+rPrice+"~COP");
        
        return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-12 mb-4" >
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img src={wPhoto} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src={wPhoto} alt="Placeholder image"/>
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
                        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                            <input name="merchantId" type="hidden" value="508029" />
                            <input name="accountId" type="hidden" value="512321" />
                            <input name="description" type="hidden" value="Pago Ayuda en casa" />
                            <input name="referenceCode" type="hidden" value="Ayudaencasa" />
                            <input name="amount" type="hidden" value={rPrice} />
                            <input name="tax" type="hidden" value="0" />
                            <input name="taxReturnBase" type="hidden" value="0" />
                            <input name="currency" type="hidden" value="COP" />
                            <input name="signature" type="hidden" value={hash} />
                            <input name="test" type="hidden" value="1" />
                            <input name="buyerEmail" type="hidden" value="davidjrf95@gmail.com" />
                            <input name="responseUrl" type="hidden" value="http://www.test.com/response" />
                            <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation" />
                            <input name="Submit" type="submit" className="button is-primary is-rounded" value="Pagar" />
                        </form>
                        
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Producto;