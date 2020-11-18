const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//json web token

const createToken = (id) => {
    return jwt.sign({id}, 'course');
};

//controller actions
module.exports.signup_get = (req,res) => {
    res.render('signup');
}

module.exports.signin_get = (req,res) => {
    res.render('signin');
}

module.exports.signup_post  = async (req,res) => {
    const {name, userName, email, password, phone } = req.body;

    try{
        const user = await User.create({name, userName, email, password, phone});
        const token = createToken(user._id);
        res.status(201).json({user: user._id});
    }
    catch(err){
        res.status(404).json({message: "error"});
    }
}

module.exports.signin_post = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.signin(email, password);
        const token = createToken(user._id);
        res.status(200).json({user: user._id});
    }
    catch(err){
        res.status(404).json({message: 'error'});
    }
}