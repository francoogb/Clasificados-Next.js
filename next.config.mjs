/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.api.tamila.cl'],  // Añade el dominio de donde deseas cargar las imágenes
  },
};

export default nextConfig;
