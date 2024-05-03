const { default: mongoose } = require('mongoose');
const Application=require('../models/applicationFormModel');


const getAllALLApplications=async(req,res)=>{ //admin can get all application from all users at once
    try{
        const a=await Application.find({}).populate('jobId submittedBy').sort({createdAt: -1});
        res.status(200).json(a);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getAllApplications=async(req,res)=>{ //candidate can get their applied forms when they login
    const submittedBy=req.user._id;
    try{
        const a=await Application.find({submittedBy}).populate('jobId submittedBy').sort({createdAt: -1});
        res.status(200).json(a);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getApplicationsByCId=async(req,res)=>{ //admin can get candidate's applied forms using candidate's id
    const {id}=req.params;
    try{
        const a=await Application.find({_id:id}).populate('jobId submittedBy').sort({createdAt: -1});
        res.status(200).json(a);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const postForm=async(req,res)=>{ //for candidate only
    const {firstName,lastName,email,phone}=req.body;
    const submittedBy=req.user._id;
    const resumePath = req.file.path;

    const {id}=req.params;
    try{
        const a=await Application.create({firstName,lastName,email,phone,submittedBy,jobId:id,resume: resumePath});
        res.status(200).json(a);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}

module.exports={postForm,getAllALLApplications,getAllApplications,getApplicationsByCId}