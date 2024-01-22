const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'posts.html'))
})

app.get('/post/:id', (req, res) => {
  const postId = req.params.id
  res.send(`Id de la publicacion: ${postId}`)
})

app.get('/post/:id/comments', (req, res) => {
  const postId = req.params.id
  res.send(`Comentarios de la app con ID: ${postId}`)
})

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}`)
})
