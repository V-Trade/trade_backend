const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    shareBalance: {
        type: Number
    },
    boughtPrice: {
        type: Number
    },
    previousPrice: {
        type: Number
    },
    currentPrice: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);

//Note: I didnot included daily Profit/Loss and total Profit/Loss as they can be computed at runtime.
    //Also i didnot included the amount price as it can be computed as well. These detail will require in the frontend