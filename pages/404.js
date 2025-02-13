import Link from "next/link"
import Frontend from "./../componentes/Frontend"
import Image from "next/image"

const Pagina404 = ({handleEstaLogueado, authNombre, handleCerrarSesion}) => {
  return (
    <>
    <Frontend title={"Página no encontrada"} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <div className="container py-5">
            <h1>Página No Encontrada</h1>
            <Link href={"/"}>Ir al inicio</Link>
            <hr/>
            <center><Image src="/images/yoda.png" width={350} height={467} alt="ss" /></center>
        </div>
    </Frontend>
    </>
  )
}

export default Pagina404