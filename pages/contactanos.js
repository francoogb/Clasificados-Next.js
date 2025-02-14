import { useState } from "react";
import { useRouter } from "next/router";
import Frontend from "./../componentes/Frontend";
import { formularioContacto } from "./../servicios/ApiRest";
import Swal from "sweetalert2";
const Contactanos = ({ handleEstaLogueado, authNombre, handleCerrarSesion}) => {
  let router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (nombre == 0 || nombre == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo nombre está vacío",
      });
      setNombre("");
      return;
    }
    if (correo == 0 || correo == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo E-Mail está vacío",
      });
      setCorreo("");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El E-Mail ingresado no es válido",
      });
      setCorreo("");
      return;
    }
    if (telefono == 0 || telefono == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo Teléfono está vacío",
      });
      setTelefono("");
      return;
    }
    if (mensaje == 0 || mensaje == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo mensaje está vacío",
      });
      setMensaje("");
      return;
    }
    if ((await formularioContacto({ nombre: nombre, correo: correo, telefono: telefono, mensaje: mensaje })) === 200) {
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se envió tu mensaje exitosamente",
        });
        setNombre("");
        setCorreo("");
        setTelefono("");
        setMensaje("");
        return router.push("/contactanos");
      } else {
        return Swal.fire({
          icon: "error",
          title: "Ops",
          text: "Ocurrió un error, por favor inténtelo otra vez",
        });
      }
  };
  return (
    <>
      <Frontend title={"Contáctanos"} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <div className="container py-5">
          <h1>Contáctanos</h1>
          <div className="card mb-4" id="forms">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    className="form-control"
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
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
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
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
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
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
  );
};

export default Contactanos;
