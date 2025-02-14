 
import Link from "next/link";
import Frontend from "./../componentes/Frontend";
import Sidebar from "./../componentes/Sidebar";
import Aviso from "./../componentes/Aviso";
import { getCategorias, getAvisosSearch } from "./../servicios/ApiRest";
const CategoriasSearch = ({ categorias, avisos, search, handleEstaLogueado, authNombre, handleCerrarSesion   }) => {
       
  return (
    <>
      <Frontend title={"Categorías"} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <section className="py-5">
          
          <div className="container py-5">
            
            <div className="row gy-5">
              <Sidebar valor={``} categorias={categorias} />
              <div className="col-lg-9 order-1 order-lg-2">
                <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Se encontraron {avisos.total} registros para el término {search}
              </li>
            </ol>
          </nav>
                <div className="row mb-4 align-items-center">
                  <div className="col-md-12 text-md-end">
                    <p className="h3 mb-0 p-3 p-md-0">
                     Se encontraron {avisos.total} registros para el término {search}
                    </p>
                    <hr />
                  </div>
                </div>
                <div className="row mb-4 gy-4">
                  {avisos.datos.map((aviso) => (
                    <Aviso key={aviso.id} aviso={aviso} />
                  ))}
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item mx-1">
                      <a
                        className="page-link rounded shadow-sm px-3"
                        href="#!"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="page-item mx-1 active">
                      <a className="page-link rounded shadow-sm px-3" href="#!">
                        1
                      </a>
                    </li>
                    <li className="page-item mx-1">
                      <a className="page-link rounded shadow-sm px-3" href="#!">
                        2
                      </a>
                    </li>
                    <li className="page-item mx-1">
                      <a className="page-link rounded shadow-sm px-3" href="#!">
                        3
                      </a>
                    </li>
                    <li className="page-item mx-1">
                      <a
                        className="page-link rounded shadow-sm px-3"
                        href="#!"
                        aria-label="Next"
                      >
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </Frontend>
    </>
  );
};

export default CategoriasSearch

export async function getServerSideProps(context ) {
    let search=context.query.search;
      
  let categorias = await getCategorias();
  let avisos = await getAvisosSearch(search);
  return {
    props: {
      categorias,
      avisos  ,
      search
    },
  };
}