const limite=require('express-rate-limit');

//Configurar el middleware para limitar solicitudes
const limiteSolicitudes=(app)=>{
    const limites=limite({
        windowsMs:30*60*1000,//30min
        max:1000//Limite de 1000 solicitudes por IP
    });
    app.use(limites);
};
module.exports={limiteSolicitudes};