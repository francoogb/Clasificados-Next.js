import Image from "next/image";
import Link from "next/link";

const Header = ({authNombre, handleCerrarSesion}) => {
  
  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 py-lg-2">
          <div className="container">
            <Link
              className="navbar-brand py-3 d-flex align-items-center"
              href={"/"} title="Inicio"
            >
              <Image
                src="/img/logo.svg"
                alt=""
                width="30"
                height={30}
              />
              <span className="text-uppercase text-small fw-bold text-dark ms-2 mb-0">
                Clasificados Nextjs
              </span>
            </Link>
            <button
              className="navbar-toggler navbar-toggler-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" href={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/categorias?page=1"}>
                    Categorías
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="pages"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    La empresa
                  </a>
                  <div className="dropdown-menu mt-lg-3 shadow-sm">
                    <Link className="dropdown-item" href={"sobre_nosotros"}>
                      Sobre nosotros
                    </Link>
                    
                  </div>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link" href={"/contactanos"}>
                    Contáctanos
                  </Link>
                </li>
                {authNombre && (
                  <>
                  <li className="nav-item">
                  <Link href="/panel" className="nav-link" title={`Hola ${authNombre}`}>
                    Hola {authNombre}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="#" title="Cerrar Sesión" onClick={handleCerrarSesion}>
                    <i className="fas fa-sign-out-alt"></i>
                  </Link>
                </li>
                  </>
                )}
                {!authNombre && (
                  <>
                  <li className="nav-item ms-lg-2 py-2 py-lg-0">
                  <Link
                    className="btn btn-warning"
                    href="/login" title="Login/Registro"
                  >
                    <i className="fas fa-lock"></i> Login/Registro
                  </Link>
                </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
