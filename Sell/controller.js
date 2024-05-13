const sellModel = require('./model');
const productModel = require('../Product/model');
const stockModel = require('../Stock/model');

const sellController = {

    sellCreate: async (req, res) => {
        try {
            const { sellId, sellQuantity, sellPrice } = req.body;
            
            const selectedProduct = await productModel.findById(sellId);
            if (!selectedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            const selectedStock = await stockModel.findOne({ productId: sellId });
            if (!selectedStock) {
                return res.status(404).json({ message: 'Stock not found' });
            }

            if (selectedStock.stockQuantity < sellQuantity) {
                return res.status(400).json({ message: 'Insufficient stock quantity' });
            }

            selectedStock.stockQuantity -= sellQuantity; // Subtract sell quantity from stock
            await selectedStock.save();
            
            const productNameSold = await sellModel.create({ 
                sellName: selectedProduct.productName, 
                sellQuantity, 
                sellPrice
    
            });

            res.status(200).json({ message: 'Product sold', sell: productNameSold });
        } catch (error) {
            console.error('Error selling product:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
};

module.exports = sellController;






// const sellModel = require ('./model')
// const productModel = require('../Product/model')
// const stockModel = require('../Stock/model')

// const sellController = () => {

//     const buyCreate = async (req,res) =>{
//         const {sellId,sellQuantity,sellPrice} = req.body
//         const selectedSell = productModel.findById({sellId})
//         const fromStock = stockModel.findByOne({prodIdStock:sellId})
//         const data = selectedSell.productName
//         if(!selectedSell){return};
//         if(fromStock.stockQuantity < sellQuantity){return}
//         fromStock.stockQuantity -= selectedSellQuantity
//         fromStock.save()
//         const productNameCreated = await sellModel.create({data,sellQuantity,sellPrice})
//         res.status(200).json("product created")
//     }
// }

// module.exports = sellController