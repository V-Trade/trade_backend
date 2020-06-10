const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    initialVCoin: {
        type: Number
    },
    vCoinBalance: {
        type: Number
    },
    totalValue: {
        type: Number
    },
    vCoinInvested: {
        type: Number
    },
    acHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Balance', balanceSchema);

//Note: include currentValue and profitLoss value