const express = require('express')
const router = express.Router()

let cart = []

router.get('/', (req, res) => {
  let html = '<h1>Carrito de Compras</h1>'
  if (cart.length === 0) {
    html += '<p>Carrito Vacio</p>'
  } else {
    cart.forEach((item) => {
      html += `
          <p>${item.name} x ${item.quantity} - Total: Bs ${item.total}</p>        
        `
    })
  }
  res.send(html)
})

//Route to add product
router.post('/add', (req, res) => {
  const { name, price, quantity } = req.body
  const total = parseFloat(price) * parseInt(quantity)
  cart.push({ name, quantity, total })
  res.send(`Argegado ${quantity} - ${name} correctamente`)
})

module.exports = router
