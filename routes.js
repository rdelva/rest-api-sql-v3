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
        res.status(201).json(user).end();

    } else {
        res.status(400).json({message: "First Name, Last Name, Email Address, Password is required"});
    } 
    
});


// Courses Routes/


//Get all the courses
 router.get('/courses', asyncHandler(async (req, res) => {
    const course = await Course.findAll({
        include: [{
            model: User,
            as: 'student'
        }],
    });
    if(course){
        res.json(course).status(200);
    } else {
        res.status(404).json({message: 'Courses not found'});
    }  
 }));



 router.get('/courses/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User,
            as: 'student'
        }],
    });
    
    if(course){
        res.json(course).status(200);
    } else {
        res.status.json({message:'Course not found'});
    }    

 }));




// Create route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
 router.post('/courses/', asyncHandler( async (req, res) => {
    const  course = await Course.create({            
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded:  req.body.materialsNeeded,
        userId: req.body.userId
    });      
    
    res.setHeader('location', `/${req.body.title}`);
    res.status(201).json(course).end();
 }));

//This route will update the corresponding course and return a 204 HTTP status code
 router.put('/courses/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.status(204).end();
 }));


//This route will delete the corresponding course and return a 204 HTTP status code
router.delete('/courses/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.destroy(req.body);
    res.status(204).end();
 }));




module.exports = router;