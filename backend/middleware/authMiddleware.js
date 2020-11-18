const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

// json web token is verified
    if(token){
        jwt.verify(token, 'course',(err, decodedToken) =>{
          if(err){
              console.log(err.message);
              res.redirect('/signin');
          }
          else{
              console.log(decodedToken);
              next();
          }
        });
    }
    else{
        res.redirect('/signin');
    }
}

module.exports = requireAuth;