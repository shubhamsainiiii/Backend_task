const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
    time: {
        type: Date
    }
}, {
    timestamps: true, versionKey: false
})
module.exports = mongoose.model('user', userSchema);