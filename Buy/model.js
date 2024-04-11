const mongoose = require('mongoose')

const buySchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    buyName : String,
    buyQuantity : Number,
    buyPrice : Number,
    timeBought: {default:Date.now()}
})

const buyModel = mongoose.model("Buy",buySchema)

module.exports = buyModel