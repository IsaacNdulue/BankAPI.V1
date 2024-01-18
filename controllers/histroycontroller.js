const transfermodel = require("../models/transfermodel");

const withdrawmodel = require("../models/withdrawmodel");

const utilismodel = require("../models/utilismodel");

const depositemodel =require("../models/depositemodel");


exports.history = async(req,res)=>{
    try{
const id = req.user.userId;

const transfer = await transfermodel.find({$or:[{senderId: id}, {receiverId: id}]}).lean();
const withdraw = await withdrawmodel.find({userId: id}).lean();
const utilis = await utilismodel.find({userId: id}).lean();
const deposite = await depositemodel.find({userId: id}).lean();

const userhistory = [...transfer, ...withdraw, ...utilis, ...deposite]

userhistory.sort((a,b)=> new Date(b.createAt) - new Date(a.createAt));


res.status(200).json({
    message:`All user's transaction`,
    data:userhistory
})


    }catch(error){
res.status(500).json({
    error:error.message
})
    }
}