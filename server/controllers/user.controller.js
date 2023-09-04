const User = require('../models/user.model')
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
            console.log('Request Body', req.body);
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
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
            res.status(500).json({error: 'Internal Server Error'})
        }
    }
}