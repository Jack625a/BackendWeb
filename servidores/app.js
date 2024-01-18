//Módulo HTTP
//Crear un Servidor
const http=require('http');

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    const modulo="Backend y Apis";
    res.end(`<h1>Diplomado en Diseno y Desarrollo Web, Modulo: ${modulo} </h1>`);
});

const puerto=3000;
const host='localhost';

server.listen(puerto,host, ()=>{
    console.log(`Servidor activo http://${host}:${puerto}/`);
});
