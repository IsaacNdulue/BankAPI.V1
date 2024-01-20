const transfermodel =require("../models/transfermodel");
const userModel = require("../models/onboardingmodel");
const withdrawModel =require("../models/withdrawmodel");
const utilismodel = require("../models/utilismodel");
const betmodel = require("../models/betmodel")

exports.makeTransfer = async(req,res)=>{
    try{
        const id = req.user.userId;
        const {accountNumber,amount,pin}= req.body;
        const userExist = await userModel.findOne({accountNumber});
        if(!userExist){
            return res.status(404).json({
                messsage:"this account number does not exist"
            });
        }
        const sender = await userModel.findById(id);
        if(pin !== sender.pin){
            return res.status(400).json({
                messsage:"incorrect pin"
            })
        }
        
        if(sender.balance < amount){
            return res.status(401).json({
                messsage:"insufffiency funds"
                
            })
        }
        const debit = sender.balance -= amount ;
        sender.balance = debit;
         
        await sender.save()
        
        const credit = userExist.balance += amount;
        userExist.balance = credit
       
        
        const recieve = await transfermodel.create({userId:id,
            accountNumber,
            amount,
            receiverName:userExist.firstName,
            senderName:sender.firstName,
            balance:sender.balance,
            receiverId:userExist._id,
            senderId:sender._id,
            balance:sender.balance
        });
        console.log(recieve)
            

            await sender.save();
           await userExist.save();
 
            res.status(200).json({
                message:"transfer successfully made",
                data:{recieve,
                balance:sender.balance}
            })
            

    
 }catch(error){
     res.status(500).json({
        message: error.messsage
    })
 }
}

exports.makewithdraw = async(req,res)=>{
    try{
    const id = req.user.userId;
const {amount,pin} = req.body;
const sender = await userModel.findById(id);
        if(pin !== sender.pin){
            return res.status(400).json({
                messsage:"incorrect pin"
            })
        }
        
        if(sender.balance < amount){
            return res.status(401).json({
                messsage:"insufffiency funds"
                
            })
        }
        const debit = sender.balance - amount ;
        sender.balance = debit;
        
        const recieve = await withdrawModel.create({userId:id,
            amount,
            balance:sender.balance,
            senderName:sender.firstName
        });
        console.log(recieve)
            

            await sender.save();
 
            res.status(200).json({
                message:"withdraw successfully made",
                data:{
                    amount: sender.amount,
                    balance: sender.balance,
                    firstName:sender.firstName
                    // sender
                }
            })
            


    }
    catch(error){
       res.status(500).json({
        error: error.message
       })
    }
};


exports.utilispay = async(req,res)=>{
    try{
        const id = req.user.userId;
        const {meterNumber,amount,pin} = req.body;
        const sender = await userModel.findById(id);
                if(pin !== sender.pin){
                    return res.status(400).json({
                        messsage:"incorrect pin"
                    })
                }
                
                if(sender.balance < amount){
                    return res.status(401).json({
                        messsage:"insufffiency funds"
                        
                    })
                }
                const debit = sender.balance - amount ;
                sender.balance = debit;
                
                const recieve = await utilismodel.create({userId:id,senderName:sender.firstName,amount,meterNumber});
              
                console.log(recieve)
                    
        
                    await sender.save();
         
                    res.status(200).json({
                        message:"utility payment made",
                        data:recieve
                    })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

exports.betpayment = async(req,res)=>{
    try{
        const id = req.user.userId;
        const {betNumber,amount,pin} = req.body;
        const sender = await userModel.findById(id);
                if(pin !== sender.pin){
                    return res.status(400).json({
                        messsage:"incorrect pin"
                    })
                }
                
                if(sender.balance < amount){
                    return res.status(401).json({
                        messsage:"insufffiency funds"
                        
                    })
                }
                const debit = sender.balance - amount ;
                sender.balance = debit;
                
                const recieve = await betmodel.create({userId:id,senderName:sender.firstName,amount,betNumber});
              
                console.log(recieve)
                    
        
                    await sender.save();
         
                    res.status(200).json({
                        message:"bet payment made successfully",
                        data:recieve
                    })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}