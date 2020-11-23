import React, { Component, Fragment } from 'react';

export default class Products extends Component {

  componentDidMount = () => {

  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Servicios para el hogar</h1>
            <p className="subtitle is-5">Invierta en un futuro más facil, con nuestros servicios:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
