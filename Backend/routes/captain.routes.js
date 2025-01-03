const express = require('express');
const captainController = require('../controllers/captain.controller');
const router = express.Router();
const {body} = require('express-validator');


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name should be at least 3 characters long'),
    body('fullname.lastname'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 3 }).withMessage('Password should be at least 3 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').notEmpty().withMessage('Capacity is required'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required'),

],
    captainController.registerCaptain
)
module.exports = router;