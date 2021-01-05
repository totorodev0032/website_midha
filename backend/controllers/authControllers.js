const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//json web token

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET ,{
    expiresIn: '30d'
});
}

//error handling

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
      
    }
  
    if(err.message === "incorrect email"){
      errors.email = "That email is not registered";
      return errors;
     
    }
  
    if(err.message === "incorrect password"){
      errors.password = "Password is incorrect";
      return errors;
    }
  
  
  if (err.message === 'user validation failed') {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
  }

//controller actions
module.exports.signup_post  = async (req,res) => {
    const {name, userName, email, password, phone } = req.body;

    try{
        const user = await User.create({name, userName, email, password, phone});
        if(user){
        res.status(201);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: createToken(user._id),
        });
        }
        else{
            res.status(400);
            throw new Error('Invalid user details');
        }
    }
    catch(err){
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.signin_post = async (req,res) => {
    const{email, password} = req.body;
        try{
        const user = await User.signin(email,password);
        res.status(201);
        res.json({
          id:user._id,
          email:user.email,
          password:user.password,
          token: createToken(user._id),
        });
      }
      catch(err){
         const errors = handleErrors(err);
         res.status(400).json({errors});
      }
}

module.exports.getUser = async (req,res) => {
    try{
    const user = await User.findById(req.user._id);
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else{
        res.status(404);
        throw new Error('user not found');
    }
    }
    catch(err){
        console.log(err);
    }
}