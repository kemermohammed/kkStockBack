const productModel = require ('./model')
const stockModel = require ('../Stock/model')
const productCreate = async (req,res) =>{
    
    try{
    const {productName,productPicture} = req.body
    const productNameCreated = await productModel.create({productName,productPicture})
    const stockCreate = await stockModel.create({stockId:productNameCreated._id,stockName:productNameCreated.productName})
    // const stockCreated = await stockModel.create({productName})
    res.status(200).json({"msg":"product created",product:productNameCreated})}

    catch(error){
        res.status(403).json("sth went wrong",error)
    }
}

module.exports = productCreate