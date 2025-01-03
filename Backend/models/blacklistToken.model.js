const mongoose = require('mongoose');




const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        //24hr expiry
        expires: 3600 * 24
    }
});



module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);