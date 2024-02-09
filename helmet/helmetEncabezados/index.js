//Configuracion del servidor

const express=require('express');
const {setSeguridadEncabezados,solicitudesDiferenteOrigen,registroSolicitudes}=require('./middleware/headers');
const routes=require('./routes/index');

const app=express();

//Establecer encabezados de seguridad
setSeguridadEncabezados(app);

//Permitir la solicitudes desde diferentes origenes
solicitudesDiferenteOrigen(app);

//registro y monitoreo
registroSolicitudes(app);

//rutas
app.use('/',routes);

const puerto=3000;
const host='localhost';

app.listen(puerto,host,()=>{
    console.log(`Servidor activo http://${host}:${puerto}`);
});
