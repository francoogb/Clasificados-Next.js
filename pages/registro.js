import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Frontend from "./../componentes/Frontend";
import { authRegistro } from "./../servicios/ApiRest";
import Swal from "sweetalert2";

const Registro = () => {
  let router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const handleSubmit = async (e) => {
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

    if (password == 0 || password == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo contraseña está vacío",
      });
      setPassword("");
      return;
    }
    if (password2 == 0 || password2 == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo repetir contraseña está vacío",
      });
      setPassword2("");
      return;
    }
    if (password2 != password) {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El contraseñas indicadas no coiciden",
      });
      setPassword("");
      setPassword2("");
      return;
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/i.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "La contraseña debe tener al menos 1 número, una mayúscula, y un largo entre 6 y 20 caracteres.",
      });
      setPassword("");
      return;
    }
    try {
        let registro = await authRegistro({ nombre: nombre, correo: correo, password: password });
        if (registro.estado == "ok") 
        {
             Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Te haz registrado exitosamente'
            });
            setNombre("");
            setCorreo("");
            setPassword("");
            setPassword2("");
            return router.replace(router.asPath);

        }else if(registro.estado == "repetido")
        {
            Swal.fire({
            icon: 'error',
            title: 'Ops',
            text: 'El E-Mail ingresado ya está siendo usado por otra cuenta, por favor elige otro.'
             });
            setCorreo("");
            return;
        } 
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ops',
            text: 'Ocurrió un error inesperado'
      });
    }
  };
  return (
    <>
      <Frontend title={"Registro"}>
        <div className="container py-5">
          <h1>Registro</h1>
          <div className="card mb-4" id="forms">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="nombre">
                    Nombre
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      id="nombre"
                      type="text"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="correo">
                    E-Mail
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      id="correo"
                      type="text"
                      placeholder="E-Mail"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="password2"
                  >
                    Repetir Contraseña
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      id="password2"
                      type="password"
                      placeholder="Repetir Contraseña"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-primary" title="Enviar">
                  <i className="fas fa-user-plus"></i> Enviar
                </button>
              </form>
              <hr />
              <p>
                <Link
                  href="/login"
                  className="text text-secondary"
                  title="¿Ya tienes cuenta? Loguéate aquí"
                >
                  <i className="fas fa-lock"></i> ¿Ya tienes cuenta? Loguéate
                  aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Frontend>
    </>
  );
};

export default Registro;
