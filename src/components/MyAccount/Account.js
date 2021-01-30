import React, { Component, Fragment, useState } from 'react';
import MapExample from '../MyAccount/map2';
import {updateUser,postUser,getAllUsers} from '../services/user'
import {postWorker,updateWorker,getAllWorkers} from '../services/worker'
import Correo from '../auth/LogIn'
const config = require('../../config.json');

const state = {
  direccion:'',
  correoAlt:'',
  telefono:'',
  ocupacion:''
}

const handleInputChange = (event) => {
  
  if (event.target.name==="direccion"){
    state.direccion= event.target.value
  }
  else if (event.target.name==="correoAlt"){
    state.correoAlt=event.target.value
  }
  else if (event.target.name==="telefono"){
    state.telefono=event.target.value
  }
  
}

const setWorkers = (event) =>{
  state.ocupacion=event.target.value

}

const newWorker = (event)=>{
  event.preventDefault();
  let y=0;
  getAllWorkers()
                .then(data => {
                    const info =JSON.stringify(data)               
                    for (var clave of data){
                        if (true){
                            if (clave.mail===localStorage.getItem("Correo")){
                              console.log(localStorage.getItem("Correo"));
                              
                              updateWorker(JSON.stringify(
                                {
                                  name: "cambiar",
                                  profession: state.ocupacion,
                                  mail: localStorage.getItem("Correo"),
                                  mailAlt: state.correoAlt,
                                  telephone: state.telefono,
                                  length: localStorage.getItem("userLngDoc"),
                                  latitude: localStorage.getItem("userLatDoc")
                                }
                              ))
                                .then(data => {
                                  console.log("Successful UpdateW");
                                })
                                .catch(function (err) {
                                  console.log(err);
                                });
                            }
                            else{
                              console.log(localStorage.getItem("Correo")+"jd");
                              if(y===0){
                                postWorker(JSON.stringify(
                                  // aqui va la info requerida en body, se utiliza para el caso de put y post
                                  {
                                      // Esta es la estructura del Json para un post o put de reparaciones el rId se genera automaticamente
                                      name: "cambiar",
                                      profession: state.ocupacion,
                                      mail: localStorage.getItem("Correo"),
                                      mailAlt: state.correoAlt,
                                      telephone: state.telefono,
                                      length: localStorage.getItem("userLngDoc"),
                                      latitude: localStorage.getItem("userLatDoc")
                                  }
                              ))
                                  .then(data => {
                                      console.log("Successful neworker");
                                  })
                                  .catch(function (err) {
                                      console.log(err);
                                  });
                              }
                              
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful busq worker") )
                .catch(error => console.log('error', error));
}


const setDates =(event) =>{
  event.preventDefault();
  let y=0;
  getAllUsers()
                .then(data => {
                    const info =JSON.stringify(data)
                                 
                    for (var clave of data){
                        if (true){
                            
                            if (clave.mail===localStorage.getItem("Correo")){
                             if(y===0){
                              console.log(localStorage.getItem("Correo"));
                              
                              updateUser(JSON.stringify(
                                {
                                  mail: localStorage.getItem("Correo"),
                                  mailAlt: state.correoAlt,
                                  name: "Cambiar",
                                  photo: "liks",
                                  telephone: state.telefono,
                                  length: localStorage.getItem("userLngDoc"),
                                  latitude: localStorage.getItem("userLatDoc")
                                }
                              ))
                                .then(data => {
                                  console.log("Successful upt User");
                                })
                                .catch(function (err) {
                                  console.log(err);
                                });
                                y++;
                             }
                            }
                            else{
                              if(y===0){
                                console.log(localStorage.getItem("Correo")+"jd");
                              postUser(JSON.stringify(
                                  // aqui va la info requerida en body, se utiliza para el caso de put y post
                                  {
                                      // Esta es la estructura del Json para un post o put de reparaciones el rId se genera automaticamente
                                      mail:String(localStorage.getItem("Correo")),
                                      mailAlt: String(state.correoAlt),
                                      name: "Cambiar",
                                      photo: "liks",
                                      telephone: state.telefono,
                                      length: localStorage.getItem("userLngDoc"),
                                      latitude: localStorage.getItem("userLatDoc")
                                  }
                              ))
                                  .then(data => {
                                      console.log("Successful newUser");
                                  })
                                  .catch(function (err) {
                                      console.log(err);
                                  });
                                  y++;
                              }
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful busquedad User") )
                .catch(error => console.log('error', error));
  
  
          
}

export default class Account extends Component {

  

  render() {
    return (
      <Fragment>
         {//this.props.auth.isAuthenticated && this.props.auth.user && (
           <div>
          <section className="hero">
          <div className="container has-text-centered is-fluid">
          <div class="notification is-primary">
          <h1>Bienvenido Usuario {/*this.props.auth.user.username*/}</h1>
              <p className="subtitle is-5">Aqui podras ver tu informacion</p>
              <br />
          </div>
            </div>
            </section>
            <div class="container has-text-centered is-fluid "  align='center' >
            <section class="section">
            
            <div class="columns">
            <div class="column is-narrow is-one-third">
            <div class="column">Aqui va la foto si existe</div>
              <div class="box" >
                <p class="title is-5">Informacion del usuario</p>
                <p class="subtitle">Aqui puedes ver tus datos o actualizarlos</p>
                <form onSubmit={setDates} >
                  <div class="column">
                      <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          name="direccion"
                          type="text"
                          id="dicc"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su direccion"
                          onChange={handleInputChange}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                  <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          type="text"
                          name="correoAlt"
                          id="correAlt"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese Un correo alternativo"
                          onChange={handleInputChange}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                  <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          type="text"
                          id="telofono"
                          name="telefono"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su numero telefonico"
                          onChange={handleInputChange}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                  <div className="field">
                      <p>Aqui puede agregar una foto a su perfil</p>
                    </div>
                  </div>
                  <div class="column">
                    <button className="button is-success" type="submit" onClick={setDates}>
                        Ingresar
                      </button>
                  </div>
                </form>
              </div>
              <div class="column">
              <div class="box" >
                <p class="title is-5">Ocupacion</p>
                <p class="subtitle">Si quieres trabajar con nosotros ingresa tu Ocupacion</p>
                <form  >
                  <div class="column">
                      <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          type="text"
                          name="ocupacion"
                          id="dirct"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su ocupaccion"
                          onChange={setWorkers}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                    <button className="button is-success" type="submit" onClick={newWorker}>
                        Ingresar
                      </button>
                  </div>
                </form>
              </div>
              </div>
              
            </div> 
            <div class="column is-two-thirds">
            <div class="box" > <MapExample /></div>
            </div>
            </div>
            
            
            
            </section>
            </div>
            </div>
          /*)*/}
        
      </Fragment>
    )
  }
}
