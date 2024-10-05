const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/User")

User.post("/register",async(req,res)=>{
    const {name,email,passowrd}=req.body;
    try{
        let user = await User.findOne({email:email})
        if(user){
            return res.status(500).json({msg:"user already exits"})
        }
        user = new User({
            name,
            email,
            passowrd
        })
        const genSalt = await bcrypt.genSalt(10)
        user.passowrd = await bcrypt.hash(password,genSalt)

        const payload ={
            user:{id:user.id}
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.json({token})
    }catch(error){
        console.error(error.message)
        res.status(500).json("server error")
    }
})
User.post("/login",async(req,res)=>{
    const {email,passowrd}=req.body;
    try{
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(500).json({msg:"user not exits already exits"})
        }
       
       const isMatch = await bcrypt.compare(password,user.passowrd)

       if(!isMatch){
        return res.status(500).json("password not matched")
       }

        const payload ={
            user:{id:user.id}
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.json({token})
    }catch(error){
        console.error(error.message)
        res.status(500).json("server error")
    }
})

module.exports = router;
