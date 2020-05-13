const express=require('express')
const User=require('../models/user.model')
var router=express.Router()

router.use(express.json())

router.get('/',(req,res)=>{
    res.json({message:"Bit Brothers : CRUD using Node.js with express"})
})

//CREATE ONE
router.post('/api/users',(req,res)=>{
    if (!req.body.name) {
        res.status(400).send({ message: "Name required" });
        return;
    }
    const user=new User({
        name: req.body.name,
        number: req.body.number
    })
    user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
})

//GET ALL
router.get('/api/users',(req,res) => {
    User.find((err,docs) =>{
        if(!err){
            res.send(docs)
        }
        else {
            res.status(404).send({message:"Error occured in retrieving users"})
        }
    });
});

//GET ONE
router.get('/api/users/:id',(req,res) => {
    User.findById(req.params.id, (err,doc) => {
        if(!err){
            res.send(doc)
        }
        else res.status(404).send({message:"Error occured in retrieving user"})
    });
});

//UPDATE ONE
router.put('/api/users/:id',(req,res)=>{
    User.findByIdAndUpdate(req.params.id,req.body,(err,doc)=>{
        if(!err){
            if(!doc) res.status(404).send({message:"User to be updated not found!"})
            else res.send({message:"Successfully updated"})
        }
        else res.status(500).send({message:"Error in updating user!"})
    })
})

//DELETE ONE
router.get('/api/users/delete/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err)
          res.send({message:"Deleted successfully"})
        else res.send({message:'Error in deleting user : '+err});
    });
})

module.exports=router