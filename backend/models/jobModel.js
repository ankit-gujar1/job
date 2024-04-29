const mongoose = require('mongoose');

//title, company, role, description, employmentType, requirements, responsibilities, location, salary, createdBy(ref to adminModel who created this job), applicationDeadline, designation, applicants(ref to candidates who applied, applicants will be of type array), experienceRequired, technicalSkills

const jobSchema=mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    company:{
        required:true,
        type:String
    },
    role:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    requirements:{
        required:true,
        type:String
    },
    responsibilities:{
        required:true,
        type:String
    },
    location:{
        required:true,
        type:String
    },
    salary:{
        required:true,
        type:Number
    },
    createdBy:{
        required:true,
        type:'ObjectId',
        ref:'User'
    },
    //make put/patch api request which will be called when candidate submit application form and using this request we will push _id of that user to jobModel
    applicants:[{
        type:'ObjectId',
        ref:'User'
    }]
    
},{timestamps:true})

module.exports=mongoose.model("Job",jobSchema);