const express  = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const {body} = require('express-validator');

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name should be at least 3 characters long'),
    body('fullname.lastname'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 3 }).withMessage('Password should be at least 3 characters long'),
],
    userController.registerUser 
);


module.exports = router;