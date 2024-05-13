const buyModel = require('./model');
const productModel = require('../Product/model');
const stockModel = require('../Stock/model');

const buyController = {

    buyCreate: async (req, res) => {
        try {
            const { buyId, buyQuantity, buyPrice } = req.body;
            
            const selectedProduct = await productModel.findById(buyId);
            if (!selectedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            const selectedStock = await stockModel.findOne({ productId: buyId });
            if (!selectedStock) {
                return res.status(404).json({ message: 'Stock not found' });
            }
            
            selectedStock.stockQuantity += buyQuantity;
            await selectedStock.save();
            
            const productNameCreated = await buyModel.create({ 
                buyName: selectedProduct.productName, 
                buyQuantity, 
                buyPrice 
            });

            res.status(200).json({ message: 'Product created', buy: productNameCreated });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
};

module.exports = buyController;

