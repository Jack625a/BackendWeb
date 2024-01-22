const express = require('express')
const app = express()
const path = require('path')

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 150,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 100,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 250,
  },
  {
    id: 4,
    name: 'Product 4',
    price: 450,
  },
  {
    id: 5,
    name: 'Product 5',
    price: 550,
  },
]

//Index Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Products Route
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'))
})

//Params of products/ id
app.get('/products/:id', (req, res) => {
  const productId = req.params.id
  const selectedProduct = products.find((product) => product.id == productId)
  if (selectedProduct) {
    res.send(`
      <h1>Detalles del Producto</h1>
      <p>ID: ${selectedProduct.id}</p>
      <p>Nombre: ${selectedProduct.name}</p>
      <p>Precio: ${selectedProduct.price}</p>
    `)
  } else {
    res.status(404).send('Producto no disponible')
  }
})

//Initialize the server
const PORT = 3000
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`Server run in http://${HOST}:${PORT}`)
})
