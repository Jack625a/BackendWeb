const mongoose=require('mongoose');

const userEsquemas=new mongoose.Schema({
    fbID:{
        type:Number
    },
    name:{
        type:String
    },
    email:{
        type:String
    }
});

module.exports=mongoose.model('user',userEsquemas);