const express=require('express');
const itemsRutas=require('./routes/items');

const app=express();

//Rutas
app.use('/items',itemsRutas);




//ACCESO A LA CARPETA PUBLICA
app.use(express.static('public'));

//Configuracion de las rutas no existentes
app.use((req,res)=>{
    res.status(404).send('Pagina no existe');
});

const puerto=3000;
const host='localhost';

app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`);
});

