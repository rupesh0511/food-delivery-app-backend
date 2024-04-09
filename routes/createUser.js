const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const jwtsecrettoken = "mynameisrupeshmandalandthisprojectisformct";

const bcrypt = require('bcryptjs');

router.post("/createuser",[
    body('email').isEmail(),
    body('name').isLength({min: 5}),
    body('password','incorrect password').isLength({min: 5})]
    ,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(req.body.password,salt);


    try{
        // console.log(req.body);
        // const newUser=new userModel(req.body);
        // await newUser.save();
        await userModel.create({
            name: req.body.name,
            password:securedPassword,
            email:req.body.email,
            location: req.body.location
        })
        res.json({success: true});
    }catch(err){
        console.log(err);
        res.json({success: false});
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','incorrect password').isLength({min: 5})]
    ,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }


    try{
        // console.log(req.body);
      let userData = await userModel.findOne({email: req.body.email});
    //   console.log(userData);
      if(!userData){
        return res.status(400).json({errors: "Invalid Credentials"});
      }

      const pass = await bcrypt.compare(req.body.password, userData.password);


      if(!pass){
        return res.status(400).json({errors: "Invalid Credentials"});
      }

      const data = {
        user: userData.id
      }

      const authToken = jwt.sign(data,jwtsecrettoken);


      return res.json({success: true,authToken:authToken});
        
    }catch(err){
        console.log(err);
        res.json({success: false});
    }
})

module.exports = router;