const { default: mongoose } = require('mongoose')

//Schema
const items = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
})

//Model
const Product = mongoose.model('Producto', items)

mongoose.connect('url-dbmongo')

//Operations CRUD
//  save() -> create or update records
//  find()
//  update()
//  delete()

const newProduct = new Product({ name: 'Product 1', price: 100 })
newProduct.save()

//Validations
