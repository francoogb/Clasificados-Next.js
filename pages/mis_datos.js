import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Frontend from "./../componentes/Frontend";
import { authMisDatos } from "./../servicios/ApiRest";
import nookies, {setCookie} from "nookies";

const misDatos = ({
  handleEstaLogueado,
  handleCerrarSesion,
  authNombre,
  setAuthNombre,
}) => {
  let cookies = nookies.get(null);
  let router = useRouter();
  const [nombre, setNombre] = useState(cookies.tokenNombre);
  const [correo, setCorreo] = useState(cookies.tokenCorreo);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  useEffect(() => {
    handleEstaLogueado();
  
  }, []);
   const handleSubmit =async (e) => 
  {
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
     if(password==0 && password2==0)
    {

    }else
    {
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
    }
    if((await authMisDatos({ nombre: nombre, correo:correo, password: password  })) === 201)
    {
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se modificó el registro exitosamente",
        });
        setAuthNombre(nombre);
        setCookie(null, "tokenNombre", nombre, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return router.replace(router.asPath);
    }else
    {
        return Swal.fire({
          icon: "error",
          title: "Ops",
          text: "Ocurrió un error, por favor inténtelo otra vez",
        });
    }
    }
  return (
    <>
        <Frontend
        title={"Mis datos"}
        authNombre={authNombre}
        handleCerrarSesion={handleCerrarSesion}
      >
        <section className="py-5">
          <div className="container py-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Mis datos
                </li>
              </ol>
            </nav>
            <div className="row gy-5">
              <div className="col-lg-3">
                <div className="card-body">
                  <h2 className="h5 mb-4">Menú</h2>
                  <ul>
                    <li>
                      <Link
                        className="text text-secondary"
                        href="/panel"
                        title="Panel"
                      >
                        Panel
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-danger"
                        href="/mis_datos"
                        title="Mis datos"
                      >
                        Mis datos
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-secondary"
                        href="/panel_categorias"
                        title="Categorías"
                      >
                        Categorías
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-secondary"
                        href="/mis_publicaciones?page=1"
                        title="Publicaciones"
                      >
                        Publicaciones
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="card-body">
                  <h2 className="h3 mb-4">Mis datos</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3">
                      <div className="col-lg-12">
                        <label className="form-label" htmlFor="nombre">
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

                      <div className="col-lg-12">
                        <label className="form-label" htmlFor="correo">
                          E-Mail
                        </label>
                        <input
                          className="form-control"
                          id="correo"
                          type="text"
                          placeholder="E-Mail"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          readOnly
                        />
                      </div>
                      <div className="col-lg-12 mb-lg-0">
                        <label className="form-label" htmlFor="password">
                          Contraseña
                        </label>
                        <input
                          className="form-control"
                          id="password"
                          type="password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 mb-lg-0">
                        <label className="form-label" htmlFor="password2">
                          Repetir Contraseña
                        </label>
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
                    <hr />
                    <button className="btn btn-primary" title="Modificar">
                      <i className="fas fa-pencil-alt  "></i> Modificar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Frontend>
    </>
  )
};

export default misDatos;
