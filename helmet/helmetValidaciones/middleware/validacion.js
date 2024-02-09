const {body,validacionRestultado}=require('express-validator');
const express=require('express');
//Configuracion de las validaciones
const validacionesEntradaDatos=(app)=>{
    app.use(express.json());

    //ruta de registro
    app.post('/registro',[
        //Validacion del correo
        body('correo').isEmail().normalizeEmail(),
        //Validacion de contraseñams
        body('password').isLength({min:9})
    ],(req,res)=>{
        //VALIDACION DEL MANEJOR DE ERRORES
        const errores=validacionRestultado(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores:errores.mensagge()});
        }
        res.send('Registro exitoso');
        
    });
};



module.exports={validacionesEntradaDatos};