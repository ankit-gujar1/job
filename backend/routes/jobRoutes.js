const express = require('express');
const router=express.Router();

const requireAdminAuth=require('../middlewares/requireAdminAuth');
const requireUserAuth=require('../middlewares/requireUserAuth');

const {getAllJobs,postJob,getAllJobsByParticularAdmin,getJobByID,pushCId,getAllJobsByJobTitle}=require('../controllers/jobController');

router.get('/admin/getAllJobsByAdminId',requireAdminAuth,getAllJobsByParticularAdmin); //for admin

router.get('/admin/getJobs',requireAdminAuth,getAllJobs); //for admin
router.get('/getJobs',requireUserAuth,getAllJobs); //for user
router.post('/search',requireUserAuth,getAllJobsByJobTitle); //for user

router.get('/admin/getJobByID/:id',requireAdminAuth,getJobByID); //for admin
router.get('/getJobByID/:id',requireUserAuth,getJobByID); //for user

router.put('/pushCId/:id',requireUserAuth,pushCId); //for user

router.post('/admin/postjob',requireAdminAuth,postJob); //for admin

module.exports=router;