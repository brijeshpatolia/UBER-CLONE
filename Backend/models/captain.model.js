const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlen: [3, 'First name should be at least 3 characters long'],
        },
        lastname: {
            type: String,

        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 3 characters long'],
        select: false
    },
    socketid: {
        type: String,

    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlen: [3, 'Color should be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlen: [3, 'Plate should be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            minlen: [1, 'capacity should be at least 1'],
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true
        }
    },
   
    location: {
        lat: {
            type: Number,

        },
        lng: {
            type: Number,

        }
    }


})


captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;