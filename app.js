const express = require('express');
const cors = require('cors');
const product = require('./Product/controller');
const { connectDb } = require('./config');
const buyController = require('./Buy/controller')
const sellController = require('./Sell/controller')
const app = express();
const stockController = require('./Stock/controller')

// Connect to the database
connectDb();

// Middleware
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/stock',stockController)
app.get('/product/:id', product.productViewSingle);

app.get('/product', product.productView);
app.post('/product', product.upload.single("imageName"), product.resizeUserPhoto, product.productCreate);
app.post('/buy',buyController.buyCreate)
app.post('/sell',sellController.sellCreate)
const PORT = process.env.PORT || 3003; // Use environment variable or default to 3003
app.listen(PORT, () => {
    console.log(`Server is running @ http://localhost:${PORT}`);
});




















// const express = require('express')
// const cors = require('cors')
// const fs = require('fs'); // Import the Node.js file system module
// const path = require('path'); 
// const product = require('./Product/controller')
// const multer = require("multer");

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "../src/images/");
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now();
// //     cb(null, uniqueSuffix + file.originalname);
// //   },
// // });

// // const upload = multer({ storage: storage });


// const {connectDb} = require('./config')

// const app = express()
// connectDb()
// app.use(express.static('public'));


// app.use(cors())
// app.use(express.json())

// // app.post('/product', product.upload.single("imageName"), product.resizeUserPhoto,product.productCreate)
// app.get('/product', product.productView)
// app.post('/product', product.upload.single("imageName"), product.resizeUserPhoto, product.productCreate);

// const PORT = 3003
// app.listen(PORT, () => {
//     console.log( `running @ ${PORT}`)
// })
