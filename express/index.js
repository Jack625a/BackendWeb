const express = require('express')
const index = express()
const path = require('path')

index.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

index.get('/name', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'name.html'))
})

index.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'))
})

const productsRoute = require('./routes/products')
//index.use('/products', )

const PORT = 3000
const HOST = 'localhost'

index.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})
