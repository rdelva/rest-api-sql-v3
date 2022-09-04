'use strict';

const express = require('express');

const router = express.Router();
const {User, Course} = require('./models');



function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
}


//Send a GET request that returns all properties & values  for the authenticated users
router.get('/users', asyncHandler( async (req, res) => {

    const user = await User.findAll();
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }   
}));


//Send a POST request that will create a new user
router.post('/users', async (req, res) =>{
    
    if(req.body.firstName && req.body.lastName && req.body.emailAddress && req.body.password){
        
        const  user = await User.create({
            
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        });      
        
        res.setHeader('location', '/');
        res.json(user).status(201);

    }else {

        res.status(400).json({message: "First Name, Last Name, Email Address, Password is required"});
    } 
    
});



 router.get('/courses', asyncHandler(async (req, res) => {
    const course = await Course.findAll({
        include: [{
            model: User,
            as: 'student'
    }],
    });
    res.json(course).status(201);

 }));



 router.get('/users/:id', asyncHandler( async (req, res) => {
    const user = await User.findByPk(req.params.id);
    console.log(user); 
    res.json(user);

 }));




module.exports = router;