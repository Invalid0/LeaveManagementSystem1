const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async(req, res) => {
    try {
        const {username, password, role} = req.body;

        //Check if exists
        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(400).json({message: 'User already exists'});
        
        //Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        //Save User
        const user = new User({username, password: hashPassword, role})
        await user.save();

        res.status(201).json({message:'User registered successfully'});

    } catch (exception) {
        res.status(500).json({message: 'Server error', error: exception.message});
    }
}

exports.login = async(req, res) => {
    try {
        const{username, password} = req.body;

        //Find User
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        //Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        //Create Token
        const token = jwt.sign({userId: user._id, role: user.role, }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({token, role: user.role});
    } catch (expection) {
        res.status(500).json({message: 'Server error', error: expection.message});
    }
}