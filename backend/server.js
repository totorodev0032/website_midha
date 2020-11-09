const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
const courses = require('./data/courses');

dotenv.config();

connectDB()

app.get('/', (req,res) => {
    res.send('hello')
})

//routes for all courses
app.get('/courses', (req,res) => {
    res.json(courses)
})

app.get('/courses/id', (req, res) => {
    const course = courses.find(course => course._id === req.params.id)
    res.json(course)
} );

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is running at ${PORT} at ${process.env.NODE_ENV} mode `));