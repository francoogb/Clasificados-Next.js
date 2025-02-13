import Frontend from '@/componentes/Frontend'
import React from 'react'

const contactanos = () => {
  return (

  <>
     <Frontend title={'Contactanos'} >

    <div className="container py-5">
        <h1>Contáctanos</h1>
        <div className="card mb-4" id="forms">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                />
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="correo">
                  E-Mail
                </label>
                <input
                  className="form-control"
                  id="correo"
                  type="text"
                  placeholder="E-Mail"
                />
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  className="form-control"
                  id="telefono"
                  type="text"
                  placeholder="Teléfono"
                />
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label" htmlFor="mensaje">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  placeholder="Mensaje"
                ></textarea>
              </div>
              <button className="btn btn-primary" title="Enviar">
                <i className="fas fa-envelope"></i> Enviar
              </button>
            </form>
          </div>
        </div>
      </div>

    </Frontend>
  </>

  )
}

export default contactanos