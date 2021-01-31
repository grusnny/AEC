import React, { Component, Fragment, useState } from 'react';
import "../Home/Home.css";
import { Container } from 'reactstrap';
import {getWorkersByProfession} from '../services/worker'
import MapWorkers from './MapWorkers';

let y=true;

function handleInputChange(event){
  
        this.setState({professionSelected:event.target.value});    
}

function searchWorkers (event){
    event.preventDefault();
    getWorkersByProfession(this.state.professionSelected)
    .then(data => {
        const info =JSON.stringify(data)
        let workers=[];                  
        for (var clave of data){
            workers.push(clave);
        }
        this.setState({worker:workers}); 
        console.log(workers)        
    })
    .then(data => console.log(data) )
    .catch(error => console.log('error', error));
}
export default class Home extends Component{
      constructor(props) {
        super(props)
        this.state = {
            professionSelected:'Ingeniero',
        direccion:'',
        worker:[]
        };
        searchWorkers=searchWorkers.bind(this);
        handleInputChange=handleInputChange.bind(this);
    }

    componentDidMount() {

            getWorkersByProfession(this.state.professionSelected)
            .then(data => {
                const info =JSON.stringify(data)
                let workers=[];                  
                for (var clave of data){
                    workers.push(clave);
                }
                this.setState({worker:workers});    
                
                
            })
            .then(data => console.log(data) )
            .catch(error => console.log('error', error));

    }
    render() {
    return (
        <div className="App">
            <Container className='text-left'>
                    <div className="field">
                    <div class="notification is-primary " align="center">
                      <p className="control">
                        <input 
                          className="input" 
                          name="profession"
                          type="text"
                          id="dicc"
                          aria-describedby="userNameHelp"
                          placeholder={this.state.professionSelected}
                          onChange={handleInputChange}
                        />                      
                      </p>                  
                        <button className="button is-success is-light" type="submit" onClick={searchWorkers}>
                                buscar
                        </button>
                        </div>
                    </div>
                    <MapWorkers isAuthenticated={this.props.auth.isAuthenticated} user={this.props.auth.user} workers={this.state.worker}/>
            </Container>
        </div>
    )}
}
