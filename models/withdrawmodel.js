const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
    amount:{
        type:String,
        required:true
    },
    transationType:{
        type:String,
        default:"withdraw"
    },
    senderName:{
        type:String    
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

const withdrawmodel = mongoose.model("withdrawmodel",withdrawSchema);

module.exports = withdrawmodel