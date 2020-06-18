const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String
    },
    symbol: {
        type: String
    },
    capital: {
        type: Number
    },
    outShares: {
        type: Number
    },
    sharePrice: {
        type: Number
    },
    lastPrice: {
        type: Number
    },
    eps: {
        type: Number
    },
    peRatio: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

//More detail: Price history, news, bonus
//price history can contain: company, date, closing value, ,max value, min value, total share traded