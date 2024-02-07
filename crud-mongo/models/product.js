const mongoose = require('mongoose')

const product = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Ingrese un nombre del producto'],
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: false,
  },
})

const Product = mongoose.model('Product', product)

module.exports = Product
