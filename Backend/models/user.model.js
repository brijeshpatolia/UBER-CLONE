const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname : {
            firstname : {
                type : String,
                required : true,
                minlen : [3, 'First name should be at least 3 characters long'],
            },
            lastname : {
                type : String,
                
            }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password : {
        type : String,
        required : true,
        minlength : [3, 'Password should be at least 3 characters long'],
        select : false
    },
    socketid : {
        type : String,
       
    },
    
})

userSchema.methods.generateAuthToken = async function() {
    const token  = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;

}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;