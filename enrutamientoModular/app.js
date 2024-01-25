const express=require('express');
const app=express();
const path=require('path');
const productosRuta=require('./rutas/productos');
const carritoRuta=require('./rutas/carrito');

//Configuracion de los datos
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Ruta Principal
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//Modulos de las rutas a seguir
app.use('/productos',productosRuta);
app.use('/carrito',carritoRuta);

//Inicializar el servidor
const puerto=3000;
const host='localhost';
app.listen(puerto,host,()=>{
    console.log(`Servidor http://${host}:${puerto}`);
});
