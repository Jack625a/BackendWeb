const express=require('express');
const route=express.Router();

//Los datos de interaccion
let items=[
    {
        id:1,
        nombre:'Producto 1'
    },
    {
        id:2,
        nombre:'Producto 2'
    },
    {
        id:3,
        nombre:'Producto 3'
    }
];

//Obtenecion de todos los datos
route.get('/',(req,res)=>{
    res.json(items)
})

//Ruta para crear un producto nuevo
route.post('/',(req,res)=>{
    const nuevoItem=req.body;
    items.push(nuevoItem);
    res.status(201).json(nuevoItem);
});


//Ruta para actualizar un producto por ID.
route.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {nombre}=req.body;
    const itemId= items.findIndex(item =>item.id==id);

    if(itemId !==-1){
        items[itemId].nombre=nombre;
        res.json(items[itemId]);
    }else{
        res.status(404).json({mensaje:'Error no existe el producto'});
    }
});


//Ruta eliminacion de un producto
route.delete('/:id',(req,res)=>{
    const {id}=req.params;
    items=items.filter(item=>item.id!=id);
    res.json({mensaje:'Producto eliminado correctamente'});
});

module.exports=route;