const express=require('express');
const router=express.Router();

let carrito=[];

//ruta
router.get('/',(req,res)=>{
    //mOSTRAR EL CONTENIDO DEL CARRITO
    let html='<h1>Carrito de Compras</h1>';
    if(carrito.length===0){
        html+='<p>Carrito vacio</p>';
    }else{
        carrito.forEach(item=>{
            html+=`
            <p>${item.producto}x ${item.cantidad} - Total: Bs ${item.total} </p>
            `;
        });
    }
    res.send(html);
});

//ruta para agregar el producto

router.post('/agregar',(req,res)=>{
    const {producto,precio,cantidad}=req.body;
    const total=parseFloat(precio)*parseInt(cantidad);
    carrito.push({producto,cantidad,total});
    res.send(`Añadido ${cantidad} - ${producto} correctamente`);
});

module.exports=router;