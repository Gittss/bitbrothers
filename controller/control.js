const express=require('express')
const User=require('../models/user.model')
var router=express.Router()

router.use(express.json())

router.get('/',(req,res)=>{
    res.render('home',{title:'Add User'})
})

router.post('/api/users',(req,res)=>{
    if(req.body._id =='')
      addUser(req,res);
    else editUser(req,res);
})

router.get('/api/users',(req,res) => {
    User.find((err,docs) =>{
        if(!err){
            res.render('users',{list:docs, title:'All users'});
        }
        else {
            console.log('Error in reading user : '+err);
        }
    });
});

router.get('/api/users/:id',(req,res) => {
    User.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render('home',{
                title:'Edit User',
                user:doc
            })
        }
    });
});

router.get('/api/users/delete/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err)
          res.redirect('/api/users');
        else console.log('Error in deleting user : '+err);
    });
})

function addUser(req,res){
    var user=new User()
    user.name=req.body.name;
    user.number=req.body.number;
    user.save((err,doc) => {
        if(!err) res.redirect('/api/users');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render('home', {
                    title:"Add User",
                    user: req.body
                })
            }
            else console.log('Error in adding user '+err);
        }
    });
}

function editUser(req,res){
    User.findOneAndUpdate({_id:req.body._id},req.body,{new:true, runValidators:true},(err,doc) => {
        if(!err) res.redirect('/api/users');
        else {
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render('home', {
                    title:'Edit User',
                    user:req.body
                });
            }
            else console.log('Error updating user : '+err);
        }
    });
}

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name':    
                body['nameError']=err.errors[field].message;
                break;
            case 'number':
                body['numberError']=err.errors[field].message;
                break;
            default: break;
        }
    }
}

module.exports=router