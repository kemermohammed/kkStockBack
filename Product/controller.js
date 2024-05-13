const productModel = require ('./model')
const stockModel = require ('../Stock/model')
const fs = require('fs')
const multer = require('multer')
const sharp = require('sharp')


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});



exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file){ return next();}

  try {
    req.file.filename = `product-${Date.now()}.jpg`;
    console.log(req.file.filename);

    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .toFile(`public/${req.file.filename}`);

    next();
  } catch (error) {
    next(error);
  }
};


exports.productCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    const { productName } = req.body;

    let product;
    if (req.file) {
      const imageName = `https://kkstockback-3.onrender.com/${req.file.filename}`;
      product = await productModel.create({ productName, imageName });
    } else {
      product = await productModel.create({ productName });
    }

    await stockModel.create({ productId: product._id, stockName: product.productName });

    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

    
    
//     try{
//     const {productName,productPicture} = req.body
//     const productNameCreated = await productModel.create({productName,productPicture})
//    // const stockCreate = await stockModel.create({stockId:productNameCreated._id,stockName:productNameCreated.productName})
//     // const stockCreated = await stockModel.create({productName})
//     res.status(200).json({"msg":"product created",product:productNameCreated})}

//     catch(error){
//         res.status(403).json("sth went wrong",error)
//     }


exports.productView = async (req,res) =>{
    
    try{

        const product = await productModel.find()
        res.status(200).json({msg:"showing",product:product})
    }
    catch(error){
        res.status(403).json("sth went wrong",error)
    }
}



exports.productViewSingle = async (req, res) => {
    try {
        const productId = req.params.id; // Extract the product ID from the URL
        const product = await productModel.findById(productId); // Query the database for the product by ID
        if (product) {
            res.status(200).json({ msg: "Showing product", product: product });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
};
