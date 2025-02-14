import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Frontend from "./../componentes/Frontend";
import {authLogin} from './../servicios/ApiRest';

const Login = ({ handleIniciarSesion }) => {
  //p2gHNiENUw
  let router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        let logueado = await authLogin({correo: correo, password: password});
        if(logueado.estado=="ok")
        {
            handleIniciarSesion(logueado.token, logueado.nombre, logueado.correo);
            return router.push("/panel");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ops',
            text: 'Las credenciales ingresadas no son válidas'
      });
    }
  };
  return (
    <>
      <Frontend title={"Login"}>
        <div className="container py-5">
          <h1>Login</h1>
          <div className="card mb-4" id="forms">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                <button className="btn btn-primary" title="Enviar">
                  <i className="fas fa-lock"></i> Enviar
                </button>
              </form>
              <hr />
              <p>
                <Link
                  href="/registro"
                  className="text text-secondary"
                  title="¿Aún no tienes cuenta? Regístrate aquí"
                >
                  <i className="fas fa-user-plus"></i> ¿Aún no tienes cuenta?
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Frontend>
    </>
  );
};

export default Login;
