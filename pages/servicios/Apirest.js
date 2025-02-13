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
    let datos = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_LOCAL}clasificados-categorias`, {headers: cabeceros})
    .then((response)=>
    {
        return response.data;
    })
    .catch((err)=>{
        console.log("error:"+err);
    });
    return datos;
}
