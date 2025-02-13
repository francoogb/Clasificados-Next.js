import { acortarTexto } from "@/helpers/helper";
import Image from "next/image";
import Link from "next/link";

const Aviso = ({ aviso }) => {
  // Construye la URL completa de la imagen
  const imageUrl = `https://www.api.tamila.cl/uploads/avisos/${aviso.foto}`;

  return (
    <div className="col-lg-6">
      <div className="card shadow-sm border-0 hover-transition">
        <Link
          className="d-block dark-overlay card-img-top overflow-hidden tool-trending"
          href={`/detalle/${aviso.id}/${aviso.slug}`}
        >
          <div className="overlay-content">
            <Image
              className="img-fluid"
              src={imageUrl}  // URL dinámica
              width={640}
              height={280}
              alt={aviso.nombre}
            />
          </div>
        </Link>
        <div className="card-body p-4">
          <h3 className="h5">
            <a
              className="stretched-link reset-anchor"
              href={`/detalle/${aviso.id}/${aviso.slug}`}
              title={aviso.nombre}
            >
              {aviso.nombre}
            </a>
          </h3>
          <p className="text-muted text-sm mb-0">
            {acortarTexto(aviso.descripcion, 0, 250)}....
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aviso;
