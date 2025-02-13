import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
    <Head>
    <link rel="shortcut icon" href="/images/logo.png" />
    <meta name="description" content="Clasificados Next" />
    <meta name="keywords" content="Clasificados Next" />
    <meta name="author" content="www.tamila.cl" />
    <link rel="stylesheet" href="/vendor/choices.js/public/assets/styles/choices.min.css" />
    <link rel="stylesheet" href="/vendor/swiper/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,700&amp;display=swap" />
    <link rel="stylesheet" href="/vendor/glightbox/css/glightbox.min.css" />
    <link rel="stylesheet" href="/css/style.default.css" id="theme-stylesheet" />
    <link rel="stylesheet" href="/css/custom.css" />
    <link rel="stylesheet" href="/fontawesome-free-5.15.4-web/css/all.css" />
    </Head>
    <body>
      <Main />
       <script src="https://code.jquery.com/jquery-3.6.3.js"></script>
      <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="/vendor/choices.js/public/assets/scripts/choices.min.js"></script>
      <NextScript />
    </body>
  </Html>
  );
}
