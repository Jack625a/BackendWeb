const express=require('express');
//const {body, resultadoValidacion}=require('express-validator');
const {setSeguridadEncabezados,solicitudesDiferenteOrigen,registroSolicitudes}=require('./middleware/headers');
const {validacionesEntradaDatos}=require('./middleware/validacion');
const routes=require('./routes/index');



const app=express();
setSeguridadEncabezados(app);
solicitudesDiferenteOrigen(app);
registroSolicitudes(app);
validacionesEntradaDatos(app);

//rutas
app.use('/',routes);

const puerto=3000;
const host='localhost';

app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`)
});




//Configuracion del middleware de Validacion de datos
/*app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/registro',[
    body('usuario').notEmpty().isString(),
    body('password').isLength({min:9}),
    body('correo').isEmail()
], (req,res)=>{
    //Configurar la solicitud
});*/