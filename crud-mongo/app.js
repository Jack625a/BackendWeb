const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Access to public folder
app.use(express.static('public'))

//INDEX ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if (!product) {
      return res.status(404).json({ message: 'No se hallo el producto' })
    }
    const p2 = await Product.findById(id)
    res.status(200).json(p2)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res
        .status(404)
        .json({ message: 'No se logro eliminar el producto' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

mongoose.set('strictQuery', false)
mongoose
  .connect(
    'mongodb+srv://D9393A:A213PPursus@backend.rji0kdx.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Conexion establecida')
    const HOST = 'localhost'
    const PORT = 3000
    app.listen(PORT, HOST, () => {
      console.log(`Server http://${HOST}:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
