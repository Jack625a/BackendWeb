//Creacion de un servidor
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const module = 'Backend & APIs'
  res.end(`<h1>Diplomado en Disenio y Desarrolo Web, Modulo: ${module}</h1>`)
})

const PORT = 3000
const HOST = 'localhost'

server.listen(PORT, HOST, () => {
  console.log(`Server run in http://${HOST}:${PORT}`)
})
