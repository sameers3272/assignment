const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");
dotenv.config();


const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use(express.static(path.join(__dirname, 'build')));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"build","index.html")))


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(4000, () => console.log('Server running on port 4000')))
    .catch(err => console.log(err));