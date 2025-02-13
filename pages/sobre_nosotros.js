import Frontend from "@/componentes/Frontend";
import Image from 'next/image';
const SobreNosotros = ({handleEstaLogueado, authNombre, handleCerrarSesion}) => {
  return (
    <>
     <Frontend title={'Sobre nosotros'} authNombre={authNombre} handleCerrarSesion={handleCerrarSesion}>
        <div className="container py-5">
         <h1>Clasificados Next</h1>
         <p>
            <Image src="/img/slide_1.jpg" width={1220} height={400} alt="ss" />
        </p>
        <p>Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia. Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la idea de reposar, que no me ocupo de mi arte. Ahora no sabría dibujar, ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he sido mejor pintor Cuando el valle se vela en torno mío con un encaje de vapores; cuando el sol de mediodía centellea sobre la impenetrable sombra de mi bosque sin conseguir otra cosa que filtrar entre las hojas algunos rayos que penetran hasta el fondo del santuario, cuando recostado sobre la crecida hierba, cerca de la cascada, mi vista, más próxima a la tierra, descubre multitud de menudas y diversas plantas; cuando siento más cerca de mi corazón los rumores de vida de ese pequeño mundo que palpita en los tallos de las hojas, y veo las formas innumerables e infinitas de los gusanillos y de los insectos; cuando siento, en fin, la presencia del Todopoderoso, que nos ha creado
                
</p>
                  <h1>Nuestros valores</h1>
                  <p>
                      Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. Todas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y han de sucedernos bien las cosas; porque no es posibl
                  </p>
        </div>
      </Frontend>
    </>
  )
}

export default SobreNosotros