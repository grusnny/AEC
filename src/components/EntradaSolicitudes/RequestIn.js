import React, { useState } from 'react';
import Resultado from './Resultados';
import {getAllRequests} from '../services/request'
import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAllUsers} from '../services/user'

function RequestIn(props) {

    const [resultadoBusquedaWorker, setresultadoBusquedaWorker] = React.useState([]);

    React.useEffect(() => {
        const fetchDataWorker = async () => {

            getAllRequests()
                .then(data => {
                    const info =JSON.stringify(data)
                    let request=[];                  
                    for (var clave of data){
                        if (clave.wMail===props.auth.user.attributes.email) {
                            request.push(clave);
                        }
                    }
                    setresultadoBusquedaWorker(request.map(doc => ({ ...doc, id:doc.uId })))
                    
                })
                .then(data => console.log(data) )
                .catch(error => console.log('error', error));
        }
        fetchDataWorker()
    }, [])

    return (
        <div >
            <div className="field">
                <div class="notification is-primary " align="center">
                    <h2>Revisa las peticiones de trabajos que has recibido:</h2>
                </div>
            </div>
            <div  className="row justify-content-center">
                        <Resultado
                            resultado={resultadoBusquedaWorker}
                        />
            </div>
        </div>
    );

}
export default RequestIn;