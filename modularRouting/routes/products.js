const express = require('express')
const router = express.Router()

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

//products route
router.get('/', (req, res) => {
  let html = '<h1>Productos Disponibles</h1>'
  products.forEach((product) => {
    html += `
      <div>
        <p>${product.name} - Precio: Bs ${product.price}</p>
        <form action="/cart/add" method="post">
          <input type="hidden" name="name" value="${product.name}">
          <input type="hidden" name="price" value="${product.price}">
          <input type="number" name="quantity" value="1" min="1">
          <button type="submit">Agregar al carrito</button>  
        </form>
      </div>
      `
  })
  res.send(html)
})

router.get('/id', (req, res) => {
  const productId = req.params.id
  const product = products.find((p) => p.id == parseInt(productId))
  if (product) {
    res.send(`Detalle de ${product.name} - Precio: Bs ${product.price}`)
  } else {
    res.status(404).send('Producto no disponible')
  }
})

module.exports = router
