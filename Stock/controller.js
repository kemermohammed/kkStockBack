const stockModel = require('./model')
const productModel = require('../Product/model')

const stockController = async(req,res) =>{
    try{
    const stock = await stockModel.find()
    res.status(200).json({"msg":"suc",stock:stock})}
    catch(error){
        res.status(420).json("e")
    }

}

module.exports = stockController