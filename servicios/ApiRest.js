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


export async function addAvisosComentariosPorId( request) {
  
    let datos = axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos-comentarios`, request, {
            headers: cabeceros
        })
        .then((response) => { 
            return response.status;
        }).catch((error)=>
        {
           
        });
        return datos;
}

export async function formularioContacto(request) {
    let datos = axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}clasificados-contacto`, request, {
            headers: cabeceros
        })
        .then((response) => { 
            return response.status;
        }).catch((error)=>
        {
            console.log(error);
        });
        return datos;
}

export async function getAvisosSearch(search) {
     
    let datos =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}clasificados-avisos-search?search=${search}`, {
            headers: cabeceros
        }).then((response) => {
            return response.data;

        }).catch((err) => {
            console.log(err)
        });
    return datos;
}
export async function authLogin(request) {
    let datos = axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}login`, request, {
            headers: cabeceros
        })
        .then((response) => { 
            return response.data;
        }).catch((error)=>
        {
           
        });
        return datos;
}

export async function authRegistro(request) {
    let datos = axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}registro`, request, {
            headers: cabeceros
        })
        .then((response) => { 
            return response.data;
        }).catch((error)=>
        {
           
        });
        return datos;
}

export async function authMisDatos(request) {
    try {
        let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}mis-datos`, request, {
            headers: cabeceros
        });
        return response.status;
    } catch (error) {
        console.error("Error al actualizar los datos:", error.response ? error.response.data : error.message);
        return error.response ? error.response.status : 500;
    }
}
