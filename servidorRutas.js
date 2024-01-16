
const http= require('http')
const fs= require('fs')

const server = http.createServer((req, res) => {
    let ruta = req.url

    if (ruta === '/') 
    {
        ruta = '/index'
    }
    const file = `.${ruta}.html`
    fs.readFile(file, 'utf8', (err, data) => {
        if (err){
            res.writeHead(404, {'content-Type': 'text/plain'})
            res.end('Error pagina no encontrada')
        }
        else {
            res.writeHead(200, {'content-Type': 'text/html'})
            res.end(data)
        }
    })
})

const puerto=3000
const host='localhost'

server.listen(puerto, host, ()=> {
    console.log(`Servidor Ao http://${host}:${puerto}`)
})