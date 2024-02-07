const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const Users = require('/models/user')

const app = express()

app.use(passport.initialize())
app.use(express.json())

//Connection with mongo
mongoose
  .connect('', { useNewUrlParser: true, useUnifieldTopology: true })
  .then(() => {
    console.log('Conexion exitosa DB.')
  })
  .catch((error) => {
    console.log('Error al conectar con mongo.', error)
  })

//Config of Routes
app.get('/login', passport.authenticate('facebok', { scope: ['email'] }))

app.set('View engine', 'ejs')
app.set('views', './views')

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})
