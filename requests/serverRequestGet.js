//Server creation for requests GET
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    route = './index'
    const file = `${route}.html`

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Error 404')
      }
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
  } else if (req.url === '/get-request') {
    getRequest((result) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(`Result: ${result}`)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Error')
  }
})

const PORT = 3000
const HOST = 'localhost'

server.listen(PORT, HOST, () => {
  console.log(`Server run on http://${HOST}:${PORT}/`)
})

function getRequest(get) {
  const options = {
    hostname: 'www.google.com',
    path: '/',
    method: 'GET',
  }
  const req = http.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      get(data)
    })
  })
  req.end()
}

function postRequests(get) {
  const d = 'data test'
  const options = {
    hostname: '',
    path: '',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Lenght': Buffer.byteLength(d),
    },
  }
  const req = http.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      get(data)
    })
  })
  req.write(d)
  req.end()
}
