const express = require('express')

const router = express.Router()

let items = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
]

router.get('/', (req, res) => {
  res.json(items)
})

router.post('/', (req, res) => {
  const newItem = req.body
  items.push(newItem)
  res.status(201).json(newItem)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const itemId = items.findIndex((item) => item.id == id)

  if (itemId !== -1) {
    items[itemId].name = name
    res.json(items[itemId])
  } else {
    res.status(404).json({ mensaje: 'Error no existe el producto' })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  items = items.filter((item) => item.id != id)
  res.json({ mensaje: 'Producto eliminado' })
})

module.exports = router
