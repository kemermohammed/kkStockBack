const mongoose = require('mongoose')

const connectDb = async() =>{
    await mongoose.connect("mongodb+srv://kemmah5833:bbdINYWcIBxqdd0Q@cluster0.voibum2.mongodb.net/")
    console.log("DB CONNECTED")
}
module.exports = {connectDb}