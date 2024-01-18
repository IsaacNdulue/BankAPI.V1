const mongoose = require("mongoose");

const depositeschema = new mongoose.Schema({
    userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"usermodel"
    },
    amount:{
        type:Number
    },
    transationType:{
        type:String,
        default:"deposite"
    },
},{timestamps:true})

const depositeModel = mongoose.model("depositemodel",depositeschema);

module.exports = depositeModel;