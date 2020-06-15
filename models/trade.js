const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    date: {
        type: Date,
        default: Date.now
    },
    currentBalance: {
        type: Number
    },
    creditQty: {
        type: Number
    },
    debitQty: {
        type: Number
    },
    remarks: {
        type: String
    },
    pricePerShare: {
        type: Number
    },
    status: {
        type: String,
        enum: ['hold', 'cancel', 'complete']
    },
    tradeType: {
        type: String,
        enum: ['buying', 'selling']
    },
    trader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);

//Note: Include search and filter feature by date and script