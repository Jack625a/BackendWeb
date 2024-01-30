const express=require('express');
const route=express.Router();
const Airtable=require('airtable');

//Configuracion de Airtable
const base=new Airtable({apiKey:'key5mToD2psgxpPyp'}).base('appHG3rNe4eMAkJz5');

/**Los datos de interaccion
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
**/

//Obtener los datos de Airtable
route.get('/',(req,res)=>{
    const items=[];
    base('Items').select({
        view:'Grid view'
    }).eachPage((records,fetchNextPage)=>{
        records.forEach(record=>{
            items.push(record.fields);
        });
        fetchNextPage();
    },err=>{
        if(err){
            res.status(500).json({error:'Error al obtener los datos'});
        }else{
            res.json(items);
        }
    });
});

//Crear un nuevo registro en aitrable POST
route.post('/',(req,res)=>{
    const newItem={
        nombre:req.body.nombre,
        precio:req.body.precio,
        imagen:req.body.imagen
        //Agregar otros campos descripcion, cantidad
    }
    base('Items').create(newItem,(err,record)=>{
        if(err){
            res.status(500).json({error:'Error al crear un nuevo producto'});
        }else{
            res.status(201).json(record.find);
        }
    });
});

//Actualizar un item por ID, PUT
route.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {nombre}=req.body;
    base('Items').update(id, {nombre},(err,record)=>{
        if(err){
            res.status(500).json({error: 'Error al actualizar el producto'});
        }else{
            res.json(record.fields);
        }
    });
});

//Eliminar un item por ID DELETE
route.delete('/:id',(req,res)=>{
    const {id}=req.params;
    base('Items').destroy(id,(err)=>{
        if(err){
            res.status(500).json({error: 'Error al eliminar un producto'});
        }else{
            res.json({mensaje:'Producto eliminado correactamente'});
        }
    });
});


module.exports=route;