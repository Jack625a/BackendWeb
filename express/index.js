const express=require('express');
const index=express();
const path=require('path');

//Ruta Principal
index.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//Rutas de acceso
index.get('/nombre',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','nombre.html'))
})
//Rutas de acceso
index.get('/productos',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','productos.html'))
})

//conectar las rutas
const rutaProductos=require('./rutas/productos');

//Servidor
const puerto=3000;
const host='localhost';

index.listen(puerto,host,()=>{
    console.log(`Servidor activo http://${host}:${puerto}`);
})