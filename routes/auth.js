const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const router = express.Router();



router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send('User registered successfully.');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.comparePassword(req.body.password))) {
            return res.status(400).send('Invalid credentials.');
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;