//Sistema bibliteca

const express=require('express');
const morgan=require('morgan');
const path=require('path');

const app=express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Configuracion de Middleware monitoreo y registro de solicitudes HTTP
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

//Datos de prueba 
let libros=[
    {
        id:1,
        title:'Libro 1',
        autor:'autor1'
    },
    {
        id:2,
        title:'Libro 2',
        autor:'autor2'
    },
    {
        id:3,
        title:'Libro 3',
        autor:'autor3'
    },
    {
        id:4,
        title:'Libro 4',
        autor:'autor4'
    },
    {
        id:5,
        title:'Libro 5',
        autor:'autor5'
    },
];

//Rutas 

//Ruta Principal
app.get('/',(req,res)=>{
    res.render('index',{title:'Biblioteca',libros})
});

//Rutas para agregar un nuevo libro
app.post('/agregar-libro',(req,res)=>{
    const newLibro={
        id:libros.length+1,
        title:req.body.title,
        autor:req.body.autor

    };
    libros.push(newLibro);
    res.redirect('/');
})

//Ruta para eliminar un Libro
app.post('/eliminar-libro/:id', (req,res)=>{
    const id=parseInt(req.params.id);
    libros=libros.filter(libro=>libro.id!==id);
    res.redirect('/');
})
//Tarea Semana 4 - Completar la ruta de:
//Ruta para actualizar libro por Id
//Entregables: Codigo index.js - index.ejs o editar.ejs - Captura del monitoreo

const puerto=3000;
const host='localhost';

app.listen(puerto,host,()=>{
    console.log(`Servidor activo http://${host}:${puerto}`)
});



