const express=require('express')
const path=require('path')
const bodyparser=require('body-parser')
const control=require('./controller/control')
const cors=require('cors')
require('dotenv')
require('./models/db')

var PORT=process.env.PORT || 3000
var corsOptions = { origin: "http://localhost:8081" };

var app=express()

app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.listen(PORT,()=>{
    console.log('express server started at port '+PORT)
})

app.use('/',control)