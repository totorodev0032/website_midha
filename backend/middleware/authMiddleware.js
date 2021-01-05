const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// json web token is verified
const requireAuth = asyncHandler(async (req,res,next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) try{
        token = req.headers.authorization.split(' ')[1].toString();
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id).select('-password');
        next();
    } 
    catch(error){
        console.error(error);
      res.status(401);
      throw new Error('not authorized, no token');
    }
    if(!token){
        res.status(401);
        throw new Error('not authorized, no token');
    }
});


module.exports = requireAuth;