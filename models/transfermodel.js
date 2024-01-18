const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    accountNumber:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    senderName:{
        type: String,    
    },
    receiverName:{
        type: String,    
    },
    senderId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sender",    
    },
    receiverId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Reciver",     
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    transationType:{
        type:String,
        default:"Tranfer"
    },

})

const transfermodel = mongoose.model("transfermodel",transferSchema)

module.exports = transfermodel