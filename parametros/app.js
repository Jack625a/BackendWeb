const express=require('express');
const app=express();
const path=require('path');

//Datos de Productos de prueba
const productos=[
    {
        id:1,
        nombre:'Producto 1',
        precio:150
    },
    {
        id:2,
        nombre:'Producto 2',
        precio:250
    },
    {
        id:3,
        nombre:'Producto 3',
        precio:120
    },
    {
        id:4,
        nombre:'Producto 4',
        precio:355
    },
    {
        id:5,
        nombre:'Producto 5',
        precio:550
    },
];

//Ruta Principal
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//Ruta para los productos disponibles
app.get('/productos',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','productos.html'));
});

//Parametros de los productos/ id
app.get('/producto/:id',(req,res)=>{
    const productoId=req.params.id;
    const productoSeleccionado=productos.find(producto=>producto.id==productoId);
    if(productoSeleccionado){
        res.send(`
            <h1>Detalles del Producto</h1>
            <p>ID:${productoSeleccionado.id} </p>
            <p>Nombre Producto:${productoSeleccionado.nombre} </p>
            <p>Precio: ${productoSeleccionado.precio} </p>
        `);
    }else{
        res.status(404).send('Producto no disponible');
    }
});

//Iniciazamos el servidor
const puerto=3000;
const host='localhost';
app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`);
});