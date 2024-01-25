const express=require('express');
const router=express.Router();
//Datos de Productos de prueba
const productos=[
    {
        id:1,
        nombre:'Producto 1',
        precio:150
    },
    {
        id:2,
        nombre:'Producto 2',
        precio:250
    },
    {
        id:3,
        nombre:'Producto 3',
        precio:120
    },
    {
        id:4,
        nombre:'Producto 4',
        precio:355
    },
    {
        id:5,
        nombre:'Producto 5',
        precio:550
    },
];

//Ruta de los productos
router.get('/',(req,res)=>{
    //Lista de los productos disponibles
    let html='<h1>Productos Disponibles</h1>';
    productos.forEach(producto=>{
        html+=`
        <div>
        <p>${producto.nombre} - Precio: Bs ${producto.precio} </p>
        <form action="/carrito/agregar" method="post">
            <input type="hidden" name="producto" value="${producto.nombre} ">
            <input type="hidden" name="precio" value="${producto.precio} ">
            <input type="number" name="cantidad" value="1" min="1">
            <button type="submit">Agregar al Carrito</button>
        </form>
        </div>
        `;
    });
    res.send(html);
});

//Parametros id
router.get('/id',(req,res)=>{
    const productoId=req.params.id;
    const producto=productos.find(p=>p.id===parseInt(productoId));
    if(producto){
        res.send(`Detalle de ${producto.nombre} - Precio: Bs ${producto.precio}`);
    }else{
        res.status(404).send('Producto no disponible');
    }
});

module.exports=router;