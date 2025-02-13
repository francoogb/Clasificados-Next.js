import Link from "next/link";
import Aviso from "@/componentes/Aviso";
import Frontend from "./../componentes/Frontend";
import Sidebar from './../componentes/Sidebar';
import {getCategorias, getAvisos} from './../servicios/ApiRest';

const Categorias = ({categorias, avisos, page, handleEstaLogueado, authNombre, handleCerrarSesion}) => {
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
   <Frontend title={'Categorías'} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
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
                      Categorías
                    </li>
                  </ol>
                </nav>
             
            <div className="row mb-4 gy-4">
              {avisos.datos.map((aviso)=>(
                <Aviso key={aviso.id} aviso={aviso} />
              ))}
              
             
            </div> 
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                 <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href="/categorias?page=1"
                        aria-label="Primera"
                        title="Primera"
                      >
                        <span aria-hidden="true">«««</span>
                      </Link>
                </li>
                <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href={`/categorias?page=${anterior}`}
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
                            href={`/categorias?page=${i}`}
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
                        href={`/categorias?page=${siguiente}`}
                        aria-label="Siguiente"
                        title="Siguiente"
                      >
                        <span aria-hidden="true">»</span>
                      </Link>
                    </li>
                    <li className="page-item mx-1">
                      <Link
                        className="page-link rounded shadow-sm px-3"
                        href={`/categorias?page=${avisos.links}`}
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
    </section>
   </Frontend>
   </>
  )
}

export default Categorias

//getServerSideProps
//getStaticProps
export async function getServerSideProps(context)
{
    let page = context.query.page;
    let categorias = await getCategorias();
    let avisos = await getAvisos(page);
    return{
        props:
        {
            categorias, avisos, page
        }
    }
}
