import Link from "next/link";
import Aviso from "@/componentes/Aviso";
import Frontend from "@/componentes/Frontend";
import Sidebar from '@/componentes/Sidebar';
import {getCategorias, getAvisosPorCategoria, getCategoriasPorId} from '../../servicios/ApiRest';


const AvisosPorCategoria = ({categorias, avisos, cat, handleEstaLogueado, authNombre, handleCerrarSesion}) => {
     
  return (
   <>
   <Frontend title={'Categorías'} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
     <section className="py-5">
      <div className="container py-5">
        <div className="row gy-5">
          <Sidebar valor={cat.id} categorias={categorias} />
          <div className="col-lg-9 order-1 order-lg-2">
         <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/categorias">Categorías</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Categorías: {cat.nombre}
                    </li>
                  </ol>
                </nav>
             <div className="row mb-4 align-items-center">
                  <div className="col-md-7"></div>
                  <div className="col-md-12 text-md-end">
                    <p className="h3 mb-0 p-3 p-md-0">
                      Se encontraron {avisos.total} registros para la categoría: 
                       {cat.nombre}
                    </p>
                    <hr />
                  </div>
                </div>
            <div className="row mb-4 gy-4">
              {avisos.datos.map((aviso)=>(
                <Aviso key={aviso.id} aviso={aviso} />
              ))}
              
             
            </div> 
           
          </div>
        </div>
      </div>
    </section>
   </Frontend>
   </>
  )
}

export default AvisosPorCategoria

//te dejo la tarea de agregarle paginación
export async function getServerSideProps({context, params})
{ 
  if(params)
  {
    let categorias = await getCategorias();
    let avisos = await getAvisosPorCategoria(params.slug);
    let cat = await getCategoriasPorId(params.slug);
    return{
        props:
        {
            categorias, avisos, cat
        }
    }
  }  
  
}


/*
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
*/