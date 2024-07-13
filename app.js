const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    app.get('/', (req,res)=>{
        res.send('This is the home route')
    })
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);

module.exports = app;
