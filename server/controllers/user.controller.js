// Import required modules and models
const User = require('../models/user.model')
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Exported object with functions to handle user registration, login, and logout
module.exports = {
    // Function to handle user registration
    register: async (req, res) => {
        try {
            console.log('Request Body', req.body);
            const user = await User.findOne({email: req.body.email})
            if(user){
                res.status(400).json({message: 'That email already exists'})
            }else{
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn: '2h'})
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2*60*60*1000}).json(newUser);
            }
        }
        catch(err){
            console.error(err);
            res.status(500).json(err)
        }
    },
    // Function to handle user login
    login: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email})
            if(user) {
                const matchPass = await bcrypt.compare(req.body.password, user.password)
                if(matchPass) {
                    const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn: '2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2*60*60*1000}).json(user);
                }else{
                    res.status(400).json({ message: 'Password or Email is invalid' })
                }
            }else{
                res.status(400).json({ message: 'Password or Email is invalid' })
            }
        }
        catch(err){
            res.status(500).json({error: 'Internal Server Error'})
        }
    },
    // Function to handle user logout
    logout: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({ message: 'Logout was successful' })
    }
}