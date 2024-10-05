const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect("string",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}

module.exports = connectDB();