const { default: mongoose } = require('mongoose');
const Job=require('../models/jobModel');

const getAllJobs=async(req,res)=>{ //for both admin and candidate
    // const createdBy=req.user._id;
    try{
        const j=await Job.find({}).populate('createdBy applicants').sort({createdAt: -1});
        res.status(200).json(j);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getAllJobsByParticularAdmin=async(req,res)=>{ //for admin only
    const createdBy=req.user._id;
    try{
        const j=await Job.find({createdBy}).populate('createdBy applicants').sort({createdAt: -1});
        res.status(200).json(j);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getAllJobsByJobTitle=async(req,res)=>{ //search job
    const {title}=req.body;
    try{
        const j=await Job.find({title:title}).sort({createdAt: -1});
        res.status(200).json(j);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const postJob=async(req,res)=>{ //for admin only
    const createdBy=req.user._id;
    const {title,company,role,description,requirements,responsibilities,location,salary}=req.body;
    try{
        const j=await Job.create({title,company,role,description,requirements,responsibilities,location,salary,createdBy});
        res.status(200).json(j);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const getJobByID=async(req,res)=>{ //for both admin and candidate
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"Job not found"});
    const j=await Job.findById(id).populate('createdBy applicants');
    if(!j) return res.status(404).json({error:"Job not found"});
    res.status(200).json(j); 
}

const pushCId=async(req,res)=>{ //push candidate's id in applicant
    const {id}=req.params; //job id
    const applicant=req.user._id; //candidate id
    try{
        const j=await Job.findOneAndUpdate({_id:id},{$push:{applicants:applicant}})
        res.status(200).json(j);
    }
    catch(e){
        res.status(400).json({error:e.message});
    }

}

//make put/patch api request which will be called when candidate submit application form and using this request we will push _id of that user to jobModel

module.exports={getAllJobs,postJob,getAllJobsByParticularAdmin,getJobByID,pushCId,getAllJobsByJobTitle}