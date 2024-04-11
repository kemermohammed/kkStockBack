const buyModel = require ('./model')
const productModel = require('../Product/model')
const stockModel = require('../Stock.model')

const buyController = () => {

    const buyCreate = async (req,res) =>{
        const {buyId,buyQuantity,buyPrice} = req.body
        const selectedBuy = productModel.findById({buyId})
        const data = selectedBuy.productName
        if(!selectedBuy){return};  
        stockModel.stockQuantity += buyQuantity
        theSelectedBuy.save()
        const productNameCreated = await buyModel.create({data,buyQuantity,buyPrice})
        res.status(200).json("product created")
    }
}

module.exports = buyController
