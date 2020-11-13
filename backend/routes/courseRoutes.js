const express = require('express');
const {Router} = require('express');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');

const router = Router();

router.get("/", asyncHandler(async(req,res) =>{
  const courses = await Course.find({})
  res.json(courses);
}));

router.get("/:id", asyncHandler(async(req,res)=> {
 const requestedCourseId = req.params.id;  
 const course = await Course.findById(requestedCourseId);
 if(course){
     res.status(200).json(course)
 }else{
    res.status(404).json({ message: 'Course Not Found'});
 }
}));

module.exports = router