import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Frontend from "./../componentes/Frontend";

const Panel = ({handleEstaLogueado, authNombre, handleCerrarSesion}) => {
    
    useEffect(() => {
        handleEstaLogueado();
    }, []);

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
                        className="text text-danger"
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
                  <h2 className="h3 mb-4">Panel de control</h2>
                  <p>Desde aquí podrás administrar tu cuenta</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Frontend>
    </>
  );
};

export default Panel;
