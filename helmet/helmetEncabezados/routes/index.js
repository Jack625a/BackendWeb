const express=require('express');
const router=express.Router();


//Configuracion de las rutas

//Ruta de Prueba
router.get('/',(req,res)=>{
    res.send("Configuracion Helmet Encabezados")
});

//Rutas
//
//

module.exports=router;