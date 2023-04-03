const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})