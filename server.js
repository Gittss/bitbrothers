const express=require('express')
const exphand=require('express-handlebars')
const path=require('path')
const bodyparser=require('body-parser')
const control=require('./controller/control')
require('dotenv')
require('./models/db')

var PORT=process.env.PORT || 3000

var app=express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphand({extname:'hbs', layoutsDir:__dirname+'/views/layouts/', defaultLayout:'mainlayout'}))
app.set('view engine','hbs')

app.listen(PORT,()=>{
    console.log('express server started at port '+PORT)
})

app.use('/',control)