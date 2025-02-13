export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}
export const formatearNumero= (numero) =>
    {
        return new Intl.NumberFormat().format(numero);
    }
export const acortarTexto= (valor, desde, hasta) => {
        return valor.substring(desde, hasta)
    }
export const soloNumeros = (e)=>
{
    let key = (document.all) ? e.keyCode : e.which;
    //alert(key);
    if (key == 17) return false;
    /* digitos,del, sup,tab,arrows*/
    return ((key >= 48 && key <= 57) || key == 8 || key == 127 || key == 9 || key == 0);
}