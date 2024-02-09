const mongoose=require('mongoose');

const userEsquema=new mongoose.Schema({
    ID:{
        type:Number
    },
    name:{
        type:String
    },
    email:{
        type:String
    }
});

module.exports=mongoose.model('user',userEsquema);