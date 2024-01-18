const express=require('express');
const router=express.Router();

// Organizar las rutas 
//rutas/productos
router.get('/productos',(req,res)=>{
    res.send('Los productos Disponibles')
});

module.exports=router;