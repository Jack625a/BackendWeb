//Manejo de diferentes rutas en un Servidor
const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    let ruta=req.url;

    if(ruta==='/'){
        ruta='/index';
    }
    const file=`.${ruta}.html`;
    fs.readFile(file,'utf8',(err,data)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end('Error Pagina no encontrada');
        }else{
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        }
    });

});

const puerto=3000;
const host='localhost';

server.listen(puerto,host,()=>{
    console.log(`Servidor Activo: http://${host}:${puerto}/`);
});