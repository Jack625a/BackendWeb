//Ejercicio enrutamiento y parametrod para un blog 
const express=require('express');
const app=express();
const path=require('path');


//Ruta Principal
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//Ruta/publicaciones
app.get('/publicaciones',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','publicaciones.html'));
});

//Parametros del enrutamiento
//Ruta/publicaciones/:id
app.get('/publicacion/:id',(req,res)=>{
    const postId=req.params.id;
    res.send(`Publicacion seleccionada con ID: ${postId}`);
});

//Ruta/publicacion/:id/comentarios
app.get('/publicacion/:id/comentarios',(req,res)=>{
    const postId=req.params.id;
    res.send(`Comentarios de la publicacion con Id:${postId} `);
});

//Parametros ....

//Incio del servidor
const puerto=3000;
const host='localhost';
app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`);
});