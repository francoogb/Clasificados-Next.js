import Link from "next/link";
import Frontend from "@/componentes/Frontend";
import { useState } from "react";
import { useRouter } from "next/router";
import {getCategorias} from './../servicios/ApiRest';

function Home({categorias, handleEstaLogueado, authNombre, handleCerrarSesion}) {
  let router = useRouter();
  const [search, setSearch] = useState('');
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    if (search == 0 || search == "") {
      
      setSearch("");
      return;
    }
    return router.push(`/categorias-search?search=${search}`)
  }
  return (
    <>
      <Frontend title={'Inicio'} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        {/*<h1 className={styles.ejemplo_module}>Hola mundo desde Nextjs</h1>*/}
        <section className="hero-home py-5">
          <div className="container pt-5">
            <div className="row">
              <div className="col-lg-7 mx-auto text-center">
                <p className="h6 text-uppercase text-primary mb-3">Clasificados Next</p>
                <h1 className="mb-5">Busca lo que necesitas aquí.</h1>
                <form onSubmit={handleSubmit} className="p-2 rounded shadow-sm bg-white">
                  <div className="input-group">
                    <input className="form-control border-0 me-2 shadow-0" type="search" placeholder="Busca aquí lo que necesites" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn btn-primary rounded" type="submit"><i className="fas fa-search"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-5">
          <div className="container pb-5">
             <header className="text-center mb-5">
              <h2 className="mb-1">¿Qué categoría buscas?</h2>
              <p className="text-muted text-sm">Tenemos avisos clasificados organizados por diferentes temáticas.</p>
             </header>
             <div className="row text-center gy-4">
              {categorias.map((categoria)=>(
                <div key={categoria.id} className="col-lg-3 px-lg-2">
                   <div className="categories-item card border-0 shadow hover-transition">
                    <div className="card-body px-4 py-5">
                       <p>
                        <i className="fas fa-check"></i>  
                        </p> 
                        <h2 className="h5">
                          <Link className="stretched-link reset-anchor-inherit" href={`/categoria/${categoria.slug}`} title={`Avisos de ${categoria.nombre}`}>
                            {categoria.nombre}
                          </Link>
                        </h2>
                    </div>
                   </div>
                </div>
              ))}
             </div>
          </div>
        </section>
      </Frontend>
    </>
  )
}

export default Home;


export async function getStaticProps() {
  let categorias = await getCategorias(); 
  return {
    props: {
      categorias 
    },
  };
}