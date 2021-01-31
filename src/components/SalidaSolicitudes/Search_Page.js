import React, { useState } from 'react';
import Resultado from './Resultados';
import {getAllRequests} from '../services/request'
import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAllUsers} from '../services/user'

function SearchPage(props) {

    let uId;
    const [resultadoBusquedaUser, setresultadoBusquedaUser] = React.useState([]);

    React.useEffect(() => {
        const fetchDataUser = async () => {

            getAllUsers()
                .then(data => {  
                    var user;        
                    for (var clave1 of data){
                        if (props.auth.isAuthenticated && props.auth.user){
                            if (clave1.mail===props.auth.user.attributes.email){
                                user=clave1;                                                        
                                getAllRequests()
                                    .then(data2 => {  
                                        let request=[];                  
                                        for (var clave2 of data2){
                                            if (user.uId==clave2.uId) {
                                                request.push(clave2);
                                            }
                                        }
                                        setresultadoBusquedaUser(request.map(doc => ({ ...doc, id:doc.uId })))
                                        console.log(request)
                                    })
                                    .then(data => console.log(data) )
                                    .catch(error => console.log('error', error));
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful Found User") )
                .catch(error => console.log('error', error));
            
        }
        fetchDataUser()
    }, [])

    return (
        <div >
            <div className="field">
                <div class="notification is-primary " align="center">
                    <h2>Revisa las peticiones de trabajos que has solicitado:</h2>
                </div>
            </div>
            <div  className="row justify-content-center">
                        <Resultado
                            resultado={resultadoBusquedaUser}
                        />
            </div>
        </div>
    );

}
export default SearchPage;