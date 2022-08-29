'use strict';

const express = require('express');

const router = express.Router();
const {Users, Courses} = require('./models');



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

     const user = await Users.findAll();
    
     console.log({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
    });
     res.json({
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
    });
  }));



module.exports = router;