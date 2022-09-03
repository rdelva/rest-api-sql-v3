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


router.get('/users', asyncHandler( async (req, res) => {

     const user = await User.findAll();

     console.log(user.lastName);
    
    //  console.log({
    //     id: user.id,
    //     lastName: user.lastName,
    //     firstName: user.firstName,
    // });
    //  res.json({
    //     id: user.id,
    //     lastName: user.lastName,
    //     firstName: user.firstName,
    // });
    res.json(user);
  }));

  router.get('/users/:id', asyncHandler( async (req, res) => {

    const user = await User.findByPk(req.params.id);

    console.log(user);
   
   //  console.log({
   //     id: user.id,
   //     lastName: user.lastName,
   //     firstName: user.firstName,
   // });
   //  res.json({
   //     id: user.id,
   //     lastName: user.lastName,
   //     firstName: user.firstName,
   // });
   res.json(user);
 }));



module.exports = router;