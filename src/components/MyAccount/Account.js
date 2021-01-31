import React, { Component, Fragment, useState } from 'react';
import MapExample from '../MyAccount/map2';
import {updateUser,postUser,getAllUsers} from '../services/user'
import {postWorker,updateWorker,getAllWorkers} from '../services/worker'
import { Auth } from 'aws-amplify';
import Correo from '../auth/LogIn'
import ModalImage from './Image';
import ModalSuccess from './ModalSuccess';

const config = require('../../config.json');

let state = {
  direccion:'',
  correoAlt:'',
  telefono:'',
  ocupacion:'',
  name:'',
  uId:'',
  wId:'',
  photo:'',
  user:null,
  isAuthenticated:false,
  isOpenModalSuccess:false,
  message:"errror",
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
  else if (event.target.name==="telefono"){
    state.telefono=event.target.value
  }
  
}

const setWorkers = (event) =>{
  state.ocupacion=event.target.value

}
function setModalSuccessShow(value){
  state.isOpenModalSuccess=value;
  this.setState({isOpenModalSuccess:value});
  if(!value){
    window.location.reload(true);
  }
}
function setMessageSuccessShow(value){
  state.message=value;
  this.setState({message:value});
}
const newWorker = (event)=>{
  if(event){
  event.preventDefault();
  }
  let y=0;
  getAllWorkers()
                .then(data => {
                    const info =JSON.stringify(data)               
                    for (var clave of data){
                        if (state.isAuthenticated && state.user ){
                            if (clave.mail===state.user.attributes.email){
                              if(y===0){ 
                              updateWorker(JSON.stringify(
                                {
                                  wId:clave.wId,
                                  name: state.user.username,
                                  profession: state.ocupacion,
                                  mail: state.user.attributes.email,
                                  mailAlt: state.correoAlt,
                                  telephone: state.telefono,
                                  length: localStorage.getItem("userLngDoc"),
                                  latitude: localStorage.getItem("userLatDoc"),
                                }
                              ))
                                .then(data => {
                                  console.log("Successful Worker Updated");
                                  setModalSuccessShow(true);
                                  setMessageSuccessShow("Usuario actualizado correctamente");                                 
                                })
                                .catch(function (err) {
                                  setModalSuccessShow(true);
                                  setMessageSuccessShow("Error:"+err);
                                });
                                y++;
                              }
                            }
                            else{
                              if(y===0){
                                postWorker(JSON.stringify(
                                  // aqui va la info requerida en body, se utiliza para el caso de put y post
                                  {
                                      // Esta es la estructura del Json para un post o put de reparaciones el rId se genera automaticamente
                                      uId: clave.uId,
                                      name: state.user.username,
                                      profession: state.ocupacion,
                                      mail: state.user.attributes.email,
                                      mailAlt: state.correoAlt,
                                      telephone: state.telefono,
                                      length: localStorage.getItem("userLngDoc"),
                                      latitude: localStorage.getItem("userLatDoc"),
                                  }
                              ))
                                  .then(data => {
                                      console.log("Successful Worker Added");
                                      setModalSuccessShow(true);
                                      setMessageSuccessShow("Trabajador creado correctamente");
                                  })
                                  .catch(function (err) {
                                    setModalSuccessShow(true);
                                    setMessageSuccessShow("Error:"+err);
                                  });
                                  y++;
                                }
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful Found Worker") )
                .catch(error => console.log('error', error));
}

const setDates =(event) =>{
  event.preventDefault();
  let y=0;
  getAllUsers()
                .then(data => {
                    const info =JSON.stringify(data)
                                 
                    for (var clave of data){
                        if (state.isAuthenticated && state.user ){
                            if (clave.mail===state.user.attributes.email){
                             if(y===0){                           
                              updateUser(JSON.stringify(
                                {
                                  uId:state.uId,
                                  name:state.name,
                                  mail: state.user.attributes.email,
                                  mailAlt: state.correoAlt,
                                  photo: state.photo,
                                  telephone: state.telefono,
                                  length: localStorage.getItem("userLngDoc"),
                                  latitude: localStorage.getItem("userLatDoc"),
                                  address:state.direccion
                                }
                              ))
                                .then(data => {
                                  console.log("Successfull User Updated");
                                  newWorker();
                                  setModalSuccessShow(true);
                                })
                                .catch(function (err) {
                                  setModalSuccessShow(true);
                                  setMessageSuccessShow("Error:"+err);
                                });
                                y++;
                             }
                            }
                            else{
                              if(y===0){
                              postUser(JSON.stringify(
                                  // aqui va la info requerida en body, se utiliza para el caso de put y post
                                  {
                                      
                                    // Esta es la estructura del Json para un post o put de reparaciones el rId se genera automaticamente
                                      name:state.name,
                                      mail:state.user.attributes.email,
                                      mailAlt: state.correoAlt,
                                      name:state.user.username,
                                      photo: state.photo,
                                      telephone: state.telefono,
                                      length: localStorage.getItem("userLngDoc"),
                                      latitude: localStorage.getItem("userLatDoc"),
                                      address:state.direccion
                                  }
                              ))
                                  .then(data => {
                                      console.log("Successful User Added");
                                      setModalSuccessShow(true);
                                      setMessageSuccessShow("Usuario creado correctamente");
                                  })
                                  .catch(function (err) {
                                    setModalSuccessShow(true);
                                    setMessageSuccessShow("Error:"+err);
                                  });
                                  y++;
                              }
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful Found User") )
                .catch(error => console.log('error', error));
  
  
          
}

export default class Account extends Component {

  constructor(props) {
    super(props)
    this.state = {
        message:"Cargando...",
        isOpenModal:false,
        isOpenModalSuccess:false,
        photo:'https://bulma.io/images/placeholders/256x256.png',
        isRegistered: false,
        direccion:"Ingrese su direccion",
        name:"",
        telefono:"Ingrese su numero telefonico",
        uId:"",
        correoAlt:"Ingrese un correo alternativo",
        ocupacion:"Ingrese su ocupaccion",
    };
    setModalSuccessShow = setModalSuccessShow.bind(this);
    setMessageSuccessShow =setMessageSuccessShow.bind(this);
}
componentDidMount() {
  state.user=  this.props.auth.user;
  state.isAuthenticated=this.props.auth.isAuthenticated;
  getAllUsers()
                .then(data => {
                    const info =JSON.stringify(data)
                    getAllWorkers()
                    .then(data2 => {             
                    for (var clave of data2){
                        if (this.props.auth.isAuthenticated && this.props.auth.user){
                            if (clave.mail===this.props.auth.user.attributes.email){
                              this.setState({
                                ocupacion:clave.profession
                              });
                              state.ocupacion=clave.profession;
                              this.setState({isRegistered:true});
                            }
                            else{
                              this.setState({isRegistered:false});
                            }
                              
                        }
                    }
                    
                    
                    
                })
                .then(data => console.log("Successful Found Worker") )
                .catch(error => console.log('error', error));              
                    for (var clave of data){
                        if (this.props.auth.isAuthenticated && this.props.auth.user){
                            if (clave.mail===this.props.auth.user.attributes.email){                             
                              this.setState({
                                direccion:clave.address,
                                name:clave.name,
                                photo:clave.photo,
                                telefono:clave.telephone,
                                uId:clave.uId,
                                correoAlt:clave.mailAlt
                              });
                              state.uId=clave.uId;
                              state.direccion=clave.address
                              state.name=clave.name;
                              state.photo=clave.photo;
                              state.telefono=clave.telephone;
                              state.correoAlt=clave.mailAlt;  
                              
                              this.setState({isRegistered:true});
                            }
                            else{
                              this.setState({isRegistered:false});
                            }
                        }
                    }
                    
                    
                })
                .then(data => console.log("Successful Found User") )
                .catch(error => console.log('error', error));
}
setUrl(url){
  state.photo=url;
}
  render() {
    return (
      <Fragment>
         {this.props.auth.isAuthenticated && this.props.auth.user && (
           <div>
          <section className="hero">
          <div className="container has-text-centered is-fluid">
          <div class="notification is-primary">
          <h1>Bienvenido Usuario {this.props.auth.user.username}</h1>
              <p className="subtitle is-5">Aqui podras ver tu informacion</p>
              <br />
          </div>
            </div>
            </section>
            <div class="container has-text-centered is-fluid "  align='center' >
            <section class="section"> 
            <div class="columns">
            <div class="column is-narrow is-one-third">
            <div align="center">   
            <figure class="image is-128x128">
                <a>
                  <img class="is-rounded"  src={this.state.photo} alt=""  onClick={()=>this.setModalImageShow(true)}/>  
                </a>
            </figure>
          </div>
          <p class="text">(haga clic en el círculo para cambiar la foto)</p>
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
                          placeholder={this.state.direccion}
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
                          placeholder={this.state.correoAlt}
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
                          placeholder={this.state.telefono}
                          onChange={handleInputChange}
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                    <ModalSuccess show={this.state.isOpenModalSuccess} onHide={() => setModalSuccessShow(false)}  message={this.state.message} />
                    <ModalImage show={this.state.isOpenModal} onHide={() => this.setModalImageShow(false)}  setphoto={this.setUrl} imgName={this.props.auth.user.attributes.sub} />
                  </div>
                  <div class="column">
                    <div class="column">
                      <button className="button is-success" type="submit" onClick={setDates}>
                          Ingresar
                        </button>
                        </div>
                        <div class="column">
                      </div>
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
                          placeholder={this.state.ocupacion}
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
         )}
        {!this.props.auth.isAuthenticated && !this.props.auth.user && (
          <section className="hero">
          <div className="container has-text-centered is-fluid">
          <div class="notification is-primary">
          <h1>Para utilizar nuestos servicios necesita iniciar sesión</h1>
              <br />
          </div>
            </div>
            </section>
        
      )}
      </Fragment>
    )
  }
  
  setModalImageShow(value){
    this.setState({isOpenModal:value});
    this.setState({photo:state.photo});
  }
}

