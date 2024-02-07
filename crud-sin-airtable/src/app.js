const express = require('express')
const routeItems = require('./routes/items')
const bodyParser = require('body-parser')

const app = express()

//Config logic for information change - forms
app.use(bodyParser.urlencoded({ extended: true }))

//Config logic for information change - data
app.use(bodyParser.json())

//Routes
app.use('/items', routeItems)

//Acess to public folder
app.use(express.static('public'))

//Config of non-exist routes
app.use((req, res) => {
  res.status(404).send('Pagina no existente')
})

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})
