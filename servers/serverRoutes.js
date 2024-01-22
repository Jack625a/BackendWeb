const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let route = req.url

  if (route === '/') {
    route = './index'
  }

  const file = `${route}.html`

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Error 404')
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  })
})

const PORT = 3000
const HOST = 'localhost'

server.listen(PORT, HOST, () => {
  console.log(`Server run in http://${HOST}:${PORT}/`)
})
