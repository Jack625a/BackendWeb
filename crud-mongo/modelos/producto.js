//Configuracion de los esquemas y el modelo
const mongoose=require('mongoose');

//Definir los esquemas
const producto=mongoose.Schema(
    {
        nombre:{
            type:String,
            require:[true, "Ingrese un nombre para el producto"]
        },
        precio:{
            type:Number,
            require:true,
        },
        imagen:{
            type:String,
            require:false,
        }
    }
)
//Configuracion del Modelo
const Product=mongoose.model('Product',producto);

module.exports=Product;