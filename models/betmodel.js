const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
    amount:{
        type:String,
        required:true
    },
    betNumber:{
        type:String  
    },
    senderName:{
        type:String
    },
    transationType:{
        type:String,
        default:"bet"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userModel"
    },
});

const betmodel = mongoose.model("betmodel",betSchema);

module.exports = betmodel