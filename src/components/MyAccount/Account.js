import React, { Component, Fragment } from 'react';

const config = require('../../config.json');

export default class Account extends Component {

  

  render() {
    return (
      <Fragment>
         {this.props.auth.isAuthenticated && this.props.auth.user && (
          <section className="section">
          <div className="container">
            <h1>Bienvenido {this.props.auth.user.username.toUpperCase()}</h1>
              <p className="subtitle is-5">Aqui podras ver tu informacion y los servicios contratados</p>
              <br />
            </div>
          </section>
            )}
        
      </Fragment>
    )
  }
}
