const express = require('express')
const cors = require('cors')
// const sellCreate = require('./Sell/controller')
// const buyCreate = require('./Buy/controller')
const productCreate = require('./Product/controller')
// const stockView = require('./Stock/controller')

const {connectDb} = require('./config')

const app = express()
connectDb()

app.use(cors())
app.use(express.json())

// app.post('/sell' ,sellCreate)
// app.post('/buy' , buyCreate)
app.post('/product', productCreate)
// app.get('/stock',stockView)

// RUN NEEDS PORT
const PORT=3000
app.listen(PORT, () => {
    console.log( `running @ ${PORT}`)
})