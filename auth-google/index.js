//Dependencias
const express=require('express');
const session=require('express-session');
const passport=require('passport');
const Google=require('passport-google-oauth').OAuth2Strategy;

const app=express();

//Configuracion de las sessiones
app.use(session({
    secret:'SECRET',
    resave:false,
    saveUninitialized:true
}));

//Inicializar pasaporte
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.set('views','./views');

//Rutas 
app.get('/',(req,res)=>{
    res.render('public/auth');
})

//Ruta de acceso exitoso a la sesión
app.get('/home',(req,res)=>{
    res.render('public/home', {user:req.user});
});

//Configuracion de la sesion con Google
passport.use(new Google({
    clientID:'',
    clientSecret:'',
    callback:"http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken,profile, done){
    return done(null, profile);
}
));

//Serializacion y deserializacion de usuarios
passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    done(null,obj);
});

//Rutas para la autentificacion con Google
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']})
);

app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),
    function(req,res){
        res.redirect('/home');
    }
);

//Configurar el servidor
const puerto=3000;
const host='localhost';
app.listen(puerto,host,()=>{
    console.log(`Servidor activo: http://${host}:${puerto}`);
});



