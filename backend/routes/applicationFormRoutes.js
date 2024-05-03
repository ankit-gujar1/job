const express = require('express');
const router=express.Router();

const requireAdminAuth=require('../middlewares/requireAdminAuth');
const requireUserAuth=require('../middlewares/requireUserAuth');

const upload = require('../multer');

const {postForm,getAllALLApplications,getAllApplications,getApplicationsByCId}=require('../controllers/applicationFormController');

router.get('/admin/getAllALLApplications',requireAdminAuth,getAllALLApplications); //for admin

router.get('/getAllApplications',requireUserAuth,getAllApplications); //for candidate

router.get('/admin/getApplicationsByCId/:id',requireAdminAuth,getApplicationsByCId); //for admin

router.post('/postForm/:id',upload.single('resume'),requireUserAuth,postForm); //for candidate

module.exports=router;