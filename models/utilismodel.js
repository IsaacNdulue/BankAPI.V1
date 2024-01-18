const mongoose = require("mongoose");

const utilisSchema = new mongoose.Schema({
    amount:{
        type:String,
        required:true
    },
    meterNumber:{
        type:String  
    },
    senderName:{
        type:String
    },
    transationType:{
        type:String,
        default:"utilis"
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

const utilismodel = mongoose.model("utilismodel",utilisSchema);

module.exports = utilismodel