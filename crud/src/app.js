const express=require('express');
const itemsRutas=require('./routes/items');
const bodyParser=require('body-parser');
const Airtable=require('airtable'); 

//Configurar Airtable
const base=new Airtable({apiKey:'su api key'}).base('su base name');


const app=express();

//Configurar la logica de intercambio de informacion para los formularios
app.use(bodyParser.urlencoded({extended:true}));

//Configurar la logica de intercambio de informacion para analisis de datos JSON
app.use(bodyParser.json());

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

