const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   firstName:{
    type:String,
    required:true
   },
   lastName:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   phoneNumber:{
    type:String,
    required:true
   },
   accountNumber:{
    type:Number,
    unique:true
   },
   balance:{
    type:Number,
    default:0
   },
   password:{
    type:String,
    required:true
   },
   sex:{
      type:String,
      enum:["female","male"]
   },
   pin:{
    type:Number,
    required:true
   },
   blackList:{
    type:Array,
    default:String
   }
},{timestamps:true});

const userModel = mongoose.model("usermodel",userSchema);

module.exports = userModel