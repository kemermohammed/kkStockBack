const sellModel = require ('./model')
const productModel = require('../Product/model')
const stockModel = require('../Stock/model')

const sellController = () => {

    const buyCreate = async (req,res) =>{
        const {sellId,sellQuantity,sellPrice} = req.body
        const selectedSell = productModel.findById({sellId})
        const fromStock = stockModel.findByOne({prodIdStock:sellId})
        const data = selectedSell.productName
        if(!selectedSell){return};
        if(fromStock.stockQuantity < sellQuantity){return}
        fromStock.stockQuantity -= selectedSellQuantity
        fromStock.save()
        const productNameCreated = await sellModel.create({data,sellQuantity,sellPrice})
        res.status(200).json("product created")
    }
}

module.exports = sellController