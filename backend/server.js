const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('API is runnig...');
})

app.listen(5000, ()=> console.log('Server is running at 5000'));