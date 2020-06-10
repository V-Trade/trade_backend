const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    admin: {
        type: String,
        default: "user"
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);