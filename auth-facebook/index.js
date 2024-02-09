const express=require('express');
const passport=require('passport');
const mongoose=require('mongoose');
const Users=require('./models/user');
require('./passport'); // Importar la configuración de Passport

const app=express();

app.use(passport.initialize());
app.use(express.json());

//Conexion con Mongo
//Configuracion a la Base de datos
mongoose.set("strictQuery",false)
mongoose.connect('').then(()=>{
    console.log('Conexion establecida a MongoDB')
}).catch((error)=>{
    console.log(error)
})

// Configuración de las Rutas
app.get('/login',passport.authenticate('facebook',{scope:['email']}));

//
app.set('view engine','ejs');
app.set('views','./views');

//Ruta para la pagina de inicio
app.get('/',(req,res)=>{
    res.render('auth');
});

//Ruta de sesion exitosa
app.get('/home',(req,res)=>{
    res.render('home',{user:req.user});
});

//Ruta de la autentificacion con Facebook
app.get("/login/callback",passport.authenticate("facebook",{
    successRedirect:"/home",
    failureRedirect:"/error",
    session:false
}));

//Ruta para manejo del error
app.get('/error',(req,res)=>{
    res.send("Error");
});


const puerto=3000;
const host='localhost';

app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`)
});

