const express=require('express');
//const helmet=require('helmet');
//const limiteSolicitudes=require('express-rate-limit');
const {setSeguridadEncabezados,solicitudesDiferenteOrigen,registroSolicitudes}=require('./middleware/headers');
const {limiteSolicitudes}=require('./middleware/limite');
const routes=require('./routes/index');



const app=express();

//Configuracion del limite de solicitudes y velocidad
//const limite=limiteSolicitudes({
  //  windowsMs:15*60*1000, ///Para 15 min
  //  max:100
//});

//app.use(limite);
setSeguridadEncabezados(app);
solicitudesDiferenteOrigen(app);
registroSolicitudes(app);
limiteSolicitudes(app);

//Ruutas

app.use('/',routes);




//Servidor


