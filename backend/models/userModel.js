const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema
({
    name: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
    },
});
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.signin = async function(email, password){
    const user = await this.findOne({email});
    if(user){
     const auth = await bcrypt.compare(password, user.password);
     if(auth){
         return user;
     }
     throw('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User',userSchema);

module.exports = User;