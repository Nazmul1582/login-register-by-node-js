const express = require('express');
const app = express();
const studentRoutes = require('./routes/student');
// const isAuth = require('./middleware')
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

let limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: 'Too many requests, Please try again later.'
})

app.use(bodyParser.json());
app.use(limiter);

app.use(morgan('tiny'))

app.use(studentRoutes);

// app.use(isAuth);
app.get('/', (req, res) => {
    res.send('<h1> Hi, Node Js Developer!</h1>');
})

app.get('*', (req, res) => {
    res.send(`<h1> No API found with this route.</h1>`)
})

// Database connection
mongoose.connect('mongodb://localhost:27017/schoolinfo')
.then(() => console.log('Database Connected'))
.catch( err => console.log( err));


// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`))