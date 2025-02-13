import axios from 'axios';
let cabeceros =
{
    'content-type': 'application/json' 
}
 let cabeceros_upload =
{
    'content-type': 'multipart/form-data' 
}


export async function getCategorias()
{
    let datos = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-categorias`, {headers: cabeceros})
    .then((response)=>
    {
        return response.data;
    })
    .catch((err)=>{
        console.log("error:"+err);
    });
    return datos;
}


export async function getAvisos(page) {
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos?page=${page}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        });
    return datos;
}


export async function getAvisosPorId(id) {
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos/${id}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        });
    return datos;
}

export async function getAvisosPorCategoria(slug) {
     
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos-categoria/${slug}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        });
    return datos;
}

export async function getCategoriasPorId(slug) {
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-categorias/${slug}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        }); 
    return  datos;
}

export async function getAvisosComentariosPorId(id) {
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos-comentarios/${id}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        });
    return datos;
}