import React, {Component} from 'react';
import Resultado from './Resultados';
import {postRequest, getAllRequests} from '../services/request'
import { Auth } from 'aws-amplify';

function SearchPage() {

    const [resultadoBusqueda, setresultadoBusqueda] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            getAllRequests()
                .then(data => {
                    const info =JSON.stringify(data)
                    let request=[];                  
                    for (var clave of data){
                        console.log(clave.profession);
                        if (true) {
                            console.log(clave);
                            request.push(clave);
                        }
                    }
                    setresultadoBusqueda(request.map(doc => ({ ...doc, id:doc.uId })))
                    
                })
                .then(data => console.log(data) )
                .catch(error => console.log('error', error));
        }
        fetchData()
    }, [])

    return (
        <div className="App">
            <div className="jumbotron" align="center">
            <h1>Revisa las peticiones de trabajos que has solicitado:</h1>
            </div>
            <section class="section">
                        <Resultado
                            resultado={resultadoBusqueda}
                        />
            </section>
        </div>
    );

}
export default SearchPage;