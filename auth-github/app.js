const express=require('express');
const passport=require('passport');
const mongoose=require('mongoose');
const User=require('./models/user');
require('dotenv').config();
require('./passport');


const app=express();

//Configuracion de Midlware Logica de intercambio de informacion
app.use(passport.initialize());
app.use(express.json());

//Configuracion con base de datos MongoDb
//Conexion con Mongo
//Configuracion a la Base de datos
const urlMongo=process.env.URL_MONGODB;
mongoose.set("strictQuery",false)
mongoose.connect(urlMongo).then(()=>{
    console.log('Conexion establecida a MongoDB')
}).catch((error)=>{
    console.log(error)
})



app.set('view engine','ejs');
app.set('views','./views');
//Definicion de las rutas
app.get('/',(req,res)=>{
    res.render('auth');
});

//Autentificacion exitosa
app.get('/home',(req,res)=>{
    res.render('home',{user:req.user});
});

app.get('/auth/github',passport.authenticate('github',{scope:['user:email']}));

//ruta de la autentificacion GITHUB
app.get('/auth/github/callback',passport.authenticate('github',{
    successRedirect:'/home',
    failureRedirect:'/error',
    session:false
}))

//Ruta en el caso de error
app.get('/error',(req,res)=>{
    res.send("Error");
});


//Configurar el servidor
const puerto=3000;
const host='localhost';
app.listen(puerto, host,()=>
    console.log(`Servidor activo: http://${host}:${puerto}`)
);





