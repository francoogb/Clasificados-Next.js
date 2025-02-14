import React from 'react';
import Head from 'next/head';  // Asegúrate de importar Head de Next.jsimport Footer from "./Footer";
import Footer from "./Footer";
import Header from './Header';


const Frontend = ({children, title='', authNombre, handleCerrarSesion}) => {
  return (
    <>
      <Head>
        <title>{`Clasificados Next - ${title}`}</title>
      </Head>
      <Header authNombre={authNombre} handleCerrarSesion={handleCerrarSesion} />
      {children}
      
      <Footer/>
    </>
  );
};

export default Frontend;
