const { default: mongoose } = require("mongoose")

//Esquemas
const items=new mongoose.Schema({
    nombre:{type: String, require: true},
    precio:{type:Number, require:true},
    //datos 
})
//Modelos
const Producto=mongoose.model('Producto',items);

//Conexion a la base de datos
mongoose.connect('url-basedatosMONGODB')

//Operaciones Crud
// Metodos para crear o actualizar documentos
//save()
//find()
//update()
//delete()
//Metodos para realizar consultas

const newProduct= new Producto({nombre:'Producto 1',precio:100});
newProduct.save();

//Validaciones

