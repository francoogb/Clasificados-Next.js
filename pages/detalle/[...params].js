import { useState  } from "react";
import Image from "next/image";
import Link from "next/link";
import Frontend from "@/componentes/Frontend";
import { useRouter } from "next/router";
import {getAvisosPorId, getCategorias, getAvisosComentariosPorId, addAvisosComentariosPorId} from './../../servicios/ApiRest';
import {formatearFecha} from './../../helpers/helper';
import Swal from "sweetalert2";
const Detalle = ({datos, categorias, comentarios, handleEstaLogueado, authNombre, handleCerrarSesion}) => {
  let router = useRouter(); 
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
   const handleSubmit=async (e)=>
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
    if (mensaje == 0 || mensaje == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo mensaje está vacío",
      });
      setMensaje("");
      return;
    }
    if(await addAvisosComentariosPorId({nombre: nombre, correo:correo, clasificados_avisos_id: datos.id, mensaje: mensaje}))
    { 
      Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se creó el registro exitosamente",
        });
        setNombre("");
        setCorreo("");
        setMensaje("");
        return router.replace(router.asPath);
    }else{
      return Swal.fire({
          icon: "error",
          title: "Ops",
          text: "Ocurrió un error, por favor inténtelo otra vez",
        });
    }
   }
  return (
   <>
   <Frontend title={`${datos.nombre}`} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
      <section className="py-5">
        <div className="container py-5">
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={`/categorias`}>Categorías</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {datos.nombre}
                </li>
              </ol>
            </nav>
            <div className="row gy-5">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm mb-4 mb-lg-5 p-2 p-lg-0">
                  <div className="card-body p-lg-5">
                    <p>
                      <Image 
                      className="img-fluid"
                      
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}uploads/avisos/${datos.foto}`}
                      width={640}
                      height={280}
                      alt={datos.nombre}
                      unoptimized={true} priority
                       />
                    </p>
                    <h2 className="h1 mb-4">{datos.nombre}</h2>
                    <h2 className="h4 mb-4">Categoría <Link href={`/categoria/${datos.clasificados_categoria_slug}`} title={datos.clasificados_categoria_nombre}>{datos.clasificados_categoria_nombre}</Link></h2>
                    <p>{datos.descripcion}</p>
                  </div>
                </div>

              <div className="card border-0 shadow-sm p-2 p-lg-0">
                <div className="card-body p-lg-5">
                   <h2 className="h3 mb-4">Hay {comentarios.length} Comentarios</h2>
                   {comentarios.map((comentario)=>(
                    <div key={comentario.id} className="mb-4">
                      <div className="row mb-3">
                        <div className="col-lg-8">
                          <div className="d-flex align-items-center">
                            <Image 
                            className="rounded-circle"
                              src="/img/usuario.png"
                              alt=""
                              height={40}
                              width="40"
                            />
                             
                              
                             
                            <div className="ms-2">
                              <h6 className="mb-0">{comentario.nombre}</h6>
                              <p className="small text-muted mb-0 fw-bold">
                                {formatearFecha(comentario.fecha)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      <div className="row ps-5">
                        <div className="col-12">
                          <p className="text-sm">
                            {comentario.mensaje}
                          </p>
                        </div>
                      </div>
                    </div>
                   ))}
                  <a
                      className="btn btn-secondary"
                      href="#reviewPanel"
                      role="button"
                      data-bs-toggle="collapse"
                      title="Agregar comentario"
                    >
                      <i className="fas fa-plus"></i> Agregar comentario
                    </a>
                  <div className="collapse" id="reviewPanel">
                     <div className="pt-4">
                      <form onSubmit={handleSubmit}>
                          <div className="row gy-3">
                            <div className="col-lg-6">
                              <label className="form-label" htmlFor="nombre">
                                Nombre
                              </label>
                              <input
                                className="form-control form-control-lg"
                                id="nombre"
                                type="text"
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre:"
                              />
                            </div>
                            <div className="col-lg-6">
                              <label className="form-label" htmlFor="correo">
                                E-Mail
                              </label>
                              <input
                                className="form-control form-control-lg"
                                id="correo"
                                type="text"
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="Tu E-Mail"
                              />
                            </div>
                            <div className="col-12">
                          <label className="form-label" htmlFor="mensaje">Tu mensaje</label>
                          <textarea className="form-control form-control-lg" id="mensaje" value={mensaje} 
                                onChange={(e) => setMensaje(e.target.value)} rows="5" placeholder="Deja tu mensaje aquí."></textarea>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary" title="Enviar"><i className="fas fa-comment"></i> Enviar</button>
                        </div>
                            <div className="col-12 d-flex justify-content-start"></div>
                          </div>
                        </form>
                     </div>
                  </div>


                </div>
              </div>

              </div>
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm mb-4 mb-lg-5 p-2 p-lg-0">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h3 mb-4">Social links</h2>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <a className="social-link facebook" href="#!">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="social-link twitter" href="#!">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="social-link vimeo" href="#!">
                          <i className="fab fa-vimeo"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="social-link instagram" href="#!">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a className="social-link youtube" href="#!">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4 mb-lg-5 p-2 p-lg-0">
                  <div className="card-body p-4 p-lg-5">
                    <h2 className="h3 mb-4">Categorías</h2>
                    <ul className="list-inline mb-0">
                      {categorias.map((categoria) => (
                        <li key={categoria.id} className="list-inline-item m-1">
                          <Link
                            className={`btn btn-${datos.clasificados_categoria_id===categoria.id ? "outline-danger": "light"}`} 
                            href={`/categoria/${categoria.slug}`}
                            title={categoria.nombre}
                            
                          >
                            {categoria.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </section>
   </Frontend>
   </>
  )
}

export default Detalle

export async function getServerSideProps({params})
{
  let categorias = await getCategorias();
  if(params)
  {
    let datos = await getAvisosPorId(params.params[0]);
    let comentarios = await getAvisosComentariosPorId(params.params[0]);
    return{
      props:{
        datos, categorias, comentarios
      }
    }
  }
}