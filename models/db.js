const mongoose=require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useFindAndModify:false},(err)=>{
    if(!err) console.log('MongoDB connected')
    else console.log(err)
})