const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    imageName: String
})

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel