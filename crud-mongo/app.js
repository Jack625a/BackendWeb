//Modulos 
const express=require('express');
const mongoose=require('mongoose');
const Product=require('./modelos/producto');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Rutas
//Ruta Principal
app.get('/',(req,res)=>{
    res.send('Conexion desde Node!!!');
})

//Ruta para obtener todos los productos
app.get('/productos', async(req,res)=>{
    try{
        const productos=await Product.find({});
        res.status(200).json(productos);
    }catch(errror){
        res.status(500).json({mensaje:errror.message});
    }
})

//Ruta para obtener un producto por ID
app.get('/productos/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const producto=await Product.findById(id);
        res.status(200).json(producto); 
    }catch(error){
        res.status(500).json({mensaje:error.message})
    }
})

//Ruta para crear un nuevo productos
app.post('/productos', async(req,res)=>{
    try{
        const producto= await Product.create(req.body)
        res.status(200).json(producto);
    }catch(errror){
        console.log(errror.message)
        res.status(500).json({mensaje:errror.message});
    }
})

//Ruta para actualzar un producto por ID
app.put('/productos/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const producto= await Product.findByIdAndUpdate(id,req.body);
        //Validamos la existencia de productos
        if(!producto){
            return res.status(404).json({mensaje:`No se encontro ningun producto con el ID: ${id}`})
        }
        const productoActualizado=await Product.findById(id);
        res.status(500).json(productoActualizado);
    }catch(errr){
        res.status(500).json({mensaje:errr.message})
    }
})


//Ruta para Eliminar un producto por ID
app.delete('/productos/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const producto=await Product.findByIdAndDelete(id);
        //Validacion de exixstencia del producto por id
        if(!producto){
            return res.status(404).json({mensaje:`No se pudo eliminar el producto con id: ${id}`});
        }
        res.status(200).json(producto);
    }catch(error){
        res.status(500).json({mensaje:error.message});
    }
})

//Configuracion a la Base de datos
mongoose.set("strictQuery",false)
mongoose.connect('').then(()=>{
    console.log('Conexion establecida a MongoDB')
    //const host='localhost';
    const puerto=3000;
    app.listen(puerto,()=>{
        console.log(`Servidor activo http://localhost:${puerto}`)
    });
}).catch((error)=>{
    console.log(error)
})



