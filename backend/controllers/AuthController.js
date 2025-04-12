const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signUp = async(req, res) => {
        try {
            const {name, email, password} = req.body;
            const user = await User.findOne({email});
            if (user) {
                return res.status(400).json({message: 'User already exists', success: false});
            }
            const newUser = new User({name, email, password});
            newUser.password = await bcrypt.hash(password, 10);
            await newUser.save();
            return res.status(201).json({message: 'User SignUp successfully', success: true});
        } catch (error) {
                res.status(500).json({message: 'Internal server error', success: false});
        }
}
const login = async(req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email});
        const errormsg ='Auth dailed email or password is incorrect';
        if (!user) {
            return res.status(403).json({message: errormsg, success: false});
        }
        
       const ispassword = await bcrypt.compare(password, user.password);
        if (!ispassword) {
            return res.status(403).json({message: errormsg, success: false});
        }
       
        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});

        return res.status(200).json({message: 'User login successfully', success: true, token,email,name: user.name});
        
        
       
    } catch (error) {
            res.status(500).json({message: 'Internal server error', success: false});
    }
}

module.exports = {
    signUp,
    login
}