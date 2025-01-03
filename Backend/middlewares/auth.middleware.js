const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'You are not authenticated!' });
    }
    const isblacklisted = await blacklistTokenModel.findOne({ token });
    if(isblacklisted){
            return res.status(401).json({ error: 'You are not authenticated!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user  = await userModel.findById(decoded._id);
        
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'You are not authenticated!' });
    }
}