const express = require('express')
const router = express.Router()

router.get('/products', (req, res) => {
  res.send('Productos Disponibles')
})

module.exports = router