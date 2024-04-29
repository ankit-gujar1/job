require('dotenv').config();

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken=(_id,role)=>{
    return jwt.sign({_id,role},process.env.SECRET,{expiresIn:'3d'});
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const u=await User.login(email,password);
        const token=createToken(u._id,u.role);
        //useAuthContext will provides data which we pass in this json (this json data is payload for dispatch fuction of useAuthContext)
        res.status(200).json({email,token,role:u.role}); 
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const signupUser=async(req,res)=>{
    const {email,password,firstName,lastName}=req.body;

    try{
        const u=await User.signup(email,password,firstName,lastName);
        const token=createToken(u._id,u.role);
        //useAuthContext will provides data which we pass in this json (this json data is payload for dispatch fuction of useAuthContext)
        res.status(200).json({email,token,role:u.role}); 
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

module.exports={loginUser,signupUser}