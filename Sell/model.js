const mongoose = require('mongoose')

const sellSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    sellName : String,
    sellQuantity : Number,
    sellPrice : Number,
    timeSold: { type: Date, default: Date.now }
})

const sellModel = mongoose.model("Sell",sellSchema)

module.exports = sellModel