import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Frontend from "./../componentes/Frontend";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2"; 
import {  getCategorias, addCategorias, editCategorias, deleteCategorias } from "./../servicios/ApiRest";

const PanelCategorias = ({categorias, handleEstaLogueado, handleCerrarSesion, authNombre }) => {
    let router = useRouter();
  useEffect(() => {
    handleEstaLogueado();
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nombre, setNombre] = useState('');
  const [acciones, setAcciones] = useState(1);
  const [accionesId, setAccionesId] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (nombre == 0 || nombre == "") {
      Swal.fire({
        icon: "error",
        title: "Ops",
        text: "El campo nombre está vacío",
      });
      setNombre("");
      return;
    }
    if (acciones == 1) 
    {
        if ((await addCategorias({ nombre: nombre  })) === 201) {
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se creó el registro exitosamente",
        });
        handleClose();
        //return router.push("/panel_categorias");
        return router.replace(router.asPath);
      } else {
        return Swal.fire({
          icon: "error",
          title: "Ops",
          text: "Ocurrió un error, por favor inténtelo otra vez",
        });
      }
    }
    if (acciones == 2) 
    {
        if ((await editCategorias({  nombre: nombre }, accionesId)) === 201) {
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se modificó el registro exitosamente",
        });
        handleClose();
        setAccionesId('');
        setNombre('');
          
         return router.replace(router.asPath);
      } else {
        return Swal.fire({
          icon: "error",
          title: "Ops",
          text: "Ocurrió un error, por favor inténtelo otra vez",
        });
      }
    }
}
  const handleCrear = async (modulo) => {
     
    setAcciones(1);
    setNombre('');
    handleShow();
  }
  const handleEditar = async (modulo) => {
     
    setAcciones(2);
    setAccionesId(modulo.id);
    setNombre(modulo.nombre);
    handleShow();
  }
  const dentroEliminar = async (id) => {
    if ((await deleteCategorias(id)) === 201) {
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se eliminó el registro exitosamente",
      });
      handleClose();
      return router.replace(router.asPath);
    } else {
      return Swal.fire({
        icon: "error",
        title: "Ops",
        text: "No es posible eliminar el registro en este momento",
      });
    }
  };
  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Realmente desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "NO",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        dentroEliminar(id);
      }
    });
  };
  return (
    <>
    <Frontend title={"Categorías"} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <section className="py-5">
          <div className="container py-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Categorías
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
                        href={"/panel"}
                        className="text text-secondary"
                        title="Panel"
                      >
                        Panel
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-secondary"
                        href="/mis_datos"
                        title="Mis datos"
                      >
                        Mis datos
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-danger"
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
                  <h2 className="h3 mb-4">Categorías</h2>
                  <p className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleCrear}>
                        <i className="fas fa-plus"></i> Crear
                    </button>
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorias.map((categoria)=>(
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombre}</td>  
                                <td className="center">
                                <Link href="#" onClick={()=>{handleEditar(categoria)}}>
                                <i className="fas fa-pencil-alt  "></i>
                              </Link>
                              &nbsp;&nbsp;&nbsp;
                              <Link href="#" onClick={()=>{handleEliminar(categoria.id)}}>
                                <i className="fas fa-trash  "></i>
                              </Link>
                                </td> 
                            </tr>
                        ))}
                      </tbody>
                      </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Frontend>
      <Modal size="lg" show={show} onHide={handleClose} id="listingModal">
        <Modal.Header closeButton>
          <Modal.Title>{acciones === 1 ? "Crear" : "Editar"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">
              
              <div className="col-lg-12">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="titulo"
                  type="text"
                  value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                />
              </div>
            <hr />
              
              
               
            </div>
            <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6 d-flex justify-content-end">
                    <button className="btn btn-primary">
                      {acciones === 1 ? (
                        <>
                          <i className="fas fa-plus"></i> Crear
                        </>
                      ) : (
                        <>
                          <i className="fas fa-pencil-alt"></i> Editar
                        </>
                      )}
                    </button>
                  </div>
                </div>
          </form>
        </Modal.Body> 
      </Modal>
    </>
  )
}

export default PanelCategorias

export async function getStaticProps() { 
  let categorias = await getCategorias();
  return {
    props: {
       categorias
    },
  };
}