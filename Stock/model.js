const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    stockName:String,
    stockQuantity: { type: Number, default: 0 }
});

const stockModel = mongoose.model("Stock", stockSchema);

module.exports = stockModel;
