import Link from "next/link";
import ModalImage from "react-modal-image"; //https://www.npmjs.com/package/react-modal-image
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Frontend from "./../componentes/Frontend";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { acortarTexto } from "./../helpers/helper";
import { getAvisos, getCategorias, addAvisos, editarAvisos, deleteAvisos } from "./../servicios/ApiRest";
const MisPublicaciones = ({avisos,
  categorias,
  page, 
  handleEstaLogueado,
  handleCerrarSesion,
  authNombre,}) => {
    let router = useRouter();
  useEffect(() => {
    handleEstaLogueado();
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clasificados_categoria_id, setClasificadosCategoriaId] = useState('0');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [acciones, setAcciones] = useState(1);
  const [accionesId, setAccionesId] = useState();
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (clasificados_categoria_id == '0' ) {
      Swal.fire({
        icon: "error",
        title: "Ops",
        text: "Debe seleccionar una categoría",
      });
      setClasificadosCategoriaId('0');
      return;
    }
    if (titulo == 0 || titulo == "") {
      Swal.fire({
        icon: "error",
        title: "Ops",
        text: "El campo nombre está vacío",
      });
      setTitulo("");
      return;
    }
    if (descripcion == 0 || descripcion == "") {
      Swal.fire({
        icon: "error",
        title: "Ops",
        text: "El campo Descripción está vacío",
      });
      setDescripcion("");
      return;
    }
    //document.querySelector('input[type="file"]').files[0]
     if (acciones == 1) 
     {
        if(await addAvisos({nombre: titulo, clasificados_categoria_id:clasificados_categoria_id, descripcion:descripcion, foto: document.querySelector('input[type="file"]').files[0]})===201)
        {
            Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se creó el registro exitosamente",
        });
        handleClose();
        setAccionesId('');
        setTitulo('');
        setClasificadosCategoriaId('0')
        setDescripcion('')
          
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
      if (acciones == 2)
       {
        if ((await editarAvisos({  nombre: titulo, clasificados_categoria_id: clasificados_categoria_id, descripcion:descripcion, foto:document.querySelector('input[type="file"]').files[0] }, accionesId)) === 201) {
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se modificó el registro exitosamente",
        });
        handleClose();
        setAccionesId('');
        setTitulo('');
        setClasificadosCategoriaId('0')
        setDescripcion('')
          
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
    setTitulo('');
    setClasificadosCategoriaId('0')
    setDescripcion('')
    handleShow();
  }
    const handleEditar = async (modulo) => {
     
    setAcciones(2);
    setAccionesId(modulo.id);
    setTitulo(modulo.nombre);
    setClasificadosCategoriaId(modulo.clasificados_categoria_id)
    setDescripcion(modulo.descripcion)
    handleShow();
  }
  const dentroEliminar = async (id) => {
    if ((await deleteAvisos(id)) === 201) {
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

  let anterior;
  let siguiente;
  let pageMenos1 = parseInt(page) - 1;
  let pageMas1 = parseInt(page) + 1;
  if (parseInt(pageMenos1) <= 1) {
    anterior = 1;
  } else {
    anterior = pageMenos1;
  }
  if (parseInt(pageMas1) >= avisos.links) {
    siguiente = avisos.links;
  } else {
    siguiente = pageMas1;
  }
  let paginas = [];
  for (let i = 1; i <= avisos.links; i++) {
    paginas[i] = i;
  }
  return (
    <>
    <Frontend title={"Panel"} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <section className="py-5">
          <div className="container py-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Panel
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
                        className="text text-secondary"
                        href="/panel_categorias"
                        title="Categorías"
                      >
                        Categorías
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text text-danger"
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
                  <h2 className="h3 mb-4">Publicaciones</h2>
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
                          <th>Categoría</th>
                          <th>Título</th>
                          <th>Descripción</th>
                          <th>Foto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {avisos.datos.map((aviso)=>(
                            <tr key={aviso.id}>
                                 <td>{aviso.id}</td>
                                <td>{aviso.clasificados_categoria_nombre}</td>
                                <td>
                                    <Link href={`/detalle/${aviso.id}/${aviso.slug}`} title={aviso.nombre} target="_blank">{aviso.nombre}</Link>
                                </td>
                                <td>
                              {acortarTexto(aviso.descripcion, 0, 100)}....
                            </td>
                            <td>
                            <ModalImage 
                            small={`${process.env.NEXT_PUBLIC_API_URL}uploads/avisos/${aviso.foto}`} 
                            large={`${process.env.NEXT_PUBLIC_API_URL}uploads/avisos/${aviso.foto}`} 
                            alt={aviso.nombre}   />
                            </td>
                            <td className="center">
                              <Link href="#" onClick={()=>{handleEditar(aviso)}}>
                                <i className="fas fa-pencil-alt  "></i>
                              </Link>
                              &nbsp;&nbsp;&nbsp;
                              <Link href="#" onClick={()=>{handleEliminar(aviso.id)}}>
                                <i className="fas fa-trash  "></i>
                              </Link>
                            </td>
                            </tr>
                        ))}
                      </tbody>
                      </table>
                       <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href="/mis_publicaciones?page=1"
                        aria-label="Previous"
                        title="Primera"
                      >
                        <span aria-hidden="true">«««</span>
                      </Link>
                    </li>
                    <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href={`/mis_publicaciones?page=${anterior}`}
                        aria-label="Anterior"
                        title="Anterior"
                      >
                        <span aria-hidden="true">«</span>
                      </Link>
                    </li>
                    
                    {/*paginación numérica */}
                    {[...paginas].map((x, i) => (
                      <li className="page-item mx-1" key={i}>
                        {i >= 1 && (
                          <Link
                            className="page-link rounded shadow-sm px-3"
                            href={`/mis_publicaciones?page=${i}`}
                          >
                            {i}
                          </Link>
                        )}
                      </li>
                    ))}
                    {/*//paginación numérica */}

                    <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href={`/mis_publicaciones?page=${siguiente}`}
                        aria-label="Siguiente"
                        title="Siguiente"
                      >
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                    <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href={`/mis_publicaciones?page=${avisos.links}`}
                        aria-label="Última"
                        title="Última"
                      >
                        <span aria-hidden="true">»»»</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row gy-3">
              <div className="col-lg-12">
                <label className="form-label" htmlFor="fullName">
                  Categoría
                </label>
                <select className=" form-control choices" value={clasificados_categoria_id}
                    onChange={(e) => setClasificadosCategoriaId(e.target.value)}>
                  <option value="0">Seleccione.....</option>
                  {categorias.map((categoria)=>(
                    <option key={categoria.id}  value={categoria.id}>
                        {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-12">
                <label className="form-label" htmlFor="titulo">
                  Título
                </label>
                <input
                  className="form-control"
                  id="titulo"
                  type="text"
                  value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título"
                />
              </div>

              
              <div className="col-lg-12">
                <label className="form-label" htmlFor="descripcion">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  rows="5"
                  placeholder="Descripción"
                ></textarea>
              </div>
              <div className="col-lg-12 mb-lg-0">
                <label className="form-label" htmlFor="foto">
                  Foto
                </label>
                <input
                  className="form-control"
                  id="foto"
                  type="file" 
                  value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                  placeholder="Foto"
                  rows="5"
                />
              </div>
               
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

export default MisPublicaciones

export async function getServerSideProps(context) {
  let page = context.query.page;
  let avisos = await getAvisos(page);
  let categorias = await getCategorias();
  return {
    props: {
      avisos,categorias
    },
  };
}