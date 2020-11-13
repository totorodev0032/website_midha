const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();
const courses = require('./data/courses');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();

connectDB()

app.use('/api/courses', courseRoutes);

app.get('/', (req,res) => {
    res.send('hello')
})


PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is running at ${PORT} at ${process.env.NODE_ENV} mode `));