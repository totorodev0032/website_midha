const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema
({
    courseName:{
        type: String,
        required: true,
    },
    price:{
       type: Number,
       required: true,
       default:0,
    },
    first_batch_date:{
        type: String,
        required:true,
    },
    second_batch_date:{
        type: String,
        required:true,
    },
    third_batch_date:{
        type: String,
    },
    demo_date:{
        type:String,
        required: true,
    },
    hours:{
        type: Number,
        required: true,
    },
    number_of_projects:{
        type: Number,
        required: true,
    },
    certification:{
        type: String,
        required: true,
    },
    mode:{
        type: String,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;