const helmet=require('helmet');
const cors=require('cors');
const morgan=require('morgan');


//Configuracion de los middlewares

//Configuracion de Middlewares
//Helmet - para establecer encabezados de seguridad HTTP
const setSeguridadEncabezados=(app)=>{
    app.use(helmet());
};

//Cors - para permitir solicitudes de difirentes origenes
const solicitudesDiferenteOrigen=(app)=>{
    app.use(cors());
};

//Morgan - para registrar o monitorear solicitudes HTTP

const registroSolicitudes=(app)=>{
    app.use(morgan('dev'));
};

module.exports={setSeguridadEncabezados,solicitudesDiferenteOrigen,registroSolicitudes};

