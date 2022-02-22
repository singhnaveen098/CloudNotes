const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/cloudnotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connecttomongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo successfully')
    })
}

module.exports = connecttomongo