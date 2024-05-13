const mongoose = require('mongoose');

const buySchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    buyName : String,
    buyQuantity : Number,
    buyPrice : Number,
    timeBought: { type: Date, default: Date.now } // Correct way to set default value
});

const buyModel = mongoose.model("Buy", buySchema);

module.exports = buyModel;
