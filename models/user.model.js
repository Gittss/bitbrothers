const mongoose=require('mongoose')

var userSchema=new mongoose.Schema({
    name:{type:String, required:'Field required'},
    number:{type:String, minlength:10, required:'Field required'}
})

const User=mongoose.model('User',userSchema)
module.exports=User