'use strict';

const express = require('express');
const app = require('./app');

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

    const users = await User.findAll({});

    res.json(users);
  }));



module.exports = router;