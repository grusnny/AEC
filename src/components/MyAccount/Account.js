import React, { Component, Fragment } from 'react';
import MapExample from '../MyAccount/map2';
const config = require('../../config.json');

export default class Account extends Component {

  

  render() {
    return (
      <Fragment>
         {this.props.auth.isAuthenticated && this.props.auth.user && (
           <div>
          <section className="hero">
          <div className="container has-text-centered is-fluid">
          <div class="notification is-primary">
          <h1>Bienvenido {this.props.auth.user.username}</h1>
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
                <form >
                  <div class="column">
                      <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          type="text"
                          id="dicc"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su direccion"
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
                          id="correAlt"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese Un correo alternativo"
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
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su numero telefonico"
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
                    <button className="button is-success">
                        Ingresar
                      </button>
                  </div>
                </form>
              </div>
              <div class="column">
              <div class="box" >
                <p class="title is-5">Ocupacion</p>
                <p class="subtitle">Si quieres trabajar con nosotros ingresa tu Ocupacion</p>
                <form >
                  <div class="column">
                      <div className="field">
                      <p className="control">
                        <input 
                          className="input" 
                          type="text"
                          id="dirct"
                          aria-describedby="userNameHelp"
                          placeholder="Ingrese su ocupaccion"
                        />
                      </p>
                    </div>
                  </div>
                  <div class="column">
                    <button className="button is-success">
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
        
      </Fragment>
    )
  }
}
