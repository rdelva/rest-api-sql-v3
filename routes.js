'use strict';

const express = require('express');
const router = express.Router();
const  User  = require('./models').User;


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

    const users = await User.findAll();
    console.log(users);

    res.json( users  );
  }));



module.exports = router;