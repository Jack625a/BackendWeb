const express=require('express');
const cors=require('cors');

const app=express();

//Middleware
app.use(express.urlencoded({extended:true}));
//Cors --  Solicitudes desde cualquier origen
app.use(cors());
//Cors -- Solicitudes desde un solo origen
app.use(cors({
    origin:'https://postgrado.ucatec.edu.bo/'
}));
//Cors -- Solicitudes desde multiples origenes
app.use(cors({
    origin:['https://postgrado.ucatec.edu.bo/','https://es.wikipedia.org/']
}));
