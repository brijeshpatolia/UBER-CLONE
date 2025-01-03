const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const capatinService = require('../services/captain.service');


module.exports.registerCaptain = async (req, res, next) => {
    
       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
       }
       const { fullname , email , password , vehicle} = req.body;
       const isEmailTaken = await captainModel.findOne({ email });
       if(isEmailTaken){
        return res.status(400).json({ errors: [{msg: 'Email already exists'}] });
       }

       const hashedPassword = await captainModel.hashPassword(password);
       const captain = await capatinService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
       })
        const token = await captain.generateAuthToken();
        
        res.status(201).json({ captain, token });

}