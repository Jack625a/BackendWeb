//token airtable Backend
//pat47Mqp5bysWlbS4.f133f4f1712b1393a0b2ac2dad6eac0d7b29d3ae8c6f1ab1495ae91518382da1

const express = require('express')
const Airtable = require('airtable')

//Config airtable
const base = new Airtable({
  apiKey:
    'pat47Mqp5bysWlbS4.ec2f0b47761a8107054abc7eccfbaff85f7399fd614c0728620f1f4205886e6f',
}).base('app3gsY61tlbsTddK')

const router = express.Router()

/*let items = [
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
]*/

//GET DATA AIRTABLE
router.get('/', (req, res) => {
  const items = []
  base('Items')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          items.push(record.fields)
        })
        fetchNextPage()
      },
      (err) => {
        if (err) {
          res.status(500).json({ error: 'Error al obtener los datos' })
        } else {
          res.json(items)
        }
      }
    )
})

//CREATE A NEW RECORD ON AIRTABLE (POST)
router.post('/', (req, res) => {
  const newItem = req.body
  /*const newItem = {
    name: req.body.name,
    precio: req.body.price,
    image: req.body.image
  }*/
  base('Items').create(newItem, (err, record) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear un nuevo producto' })
    } else {
      res.status(201).json(record.find)
    }
  })
})

//UPDATE PRODUCT BY ID (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  base('Items').update(id, { name }, (err, record) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar' })
    } else {
      res.json(record.fields)
    }
  })
})

//DELETE ITEM BY ID (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params
  base('Items').destroy(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el producto' })
    } else {
      res.json({ message: 'Producto eliminado correctamente' })
    }
  })
})

module.exports = router
