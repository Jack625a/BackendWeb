//Creacion de un servidor para solicitudes GET
const http=require('http');
const fs=require('fs');
const path=require('path');
const { buffer } = require('stream/consumers');

const server=http.createServer((req,res)=>{
    if(req.url==='/realizar-solicitud'){
        realizarSolicitud((resultado)=>{
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(`Obtención de la solicitud GET: ${resultado}`);
        });
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Error de conexion');
    }    
});

const puerto=3000;
const host='localhost';

server.listen(puerto,host,()=>{
    console.log(`Servidor Activo: http://${host}:${puerto}/`);
})


function realizarSolicitud(obtener){
    const opciones={
        hostname:'www.google.com',
        path:'/',
        method:'GET',
       
    };
    const req=http.request(opciones,(res)=>{
        let data="";

        res.on('data',(chunk)=>{
            data+=chunk;
        });
        res.on('end',()=>{
            obtener(data);
        });
    });
    req.end();
}

function solicitudesPost(obtener){
    const datos='Mensaje de Prueba para envio';

    const opciones={
        hostname:'www.google.com',
        path:'/',
        method:'POST',
        heders:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':Buffer.byteLength(datos),
        },
    };
    const req=http.request(opciones,(res)=>{
        let data="";

        res.on('data',(chunk)=>{
            data+=chunk;
        });
        res.on('end',()=>{
            obtener(data);
        });
    });
    req.write(datos);
    req.end();
}