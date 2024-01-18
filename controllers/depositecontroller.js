const despositemodel = require("../models/depositemodel");
const userModel = require("../models/onboardingmodel")

exports.createDeposite = async(req,res)=>{
    try{
        const id = req.user.userId;
        const {amount} = req.body;

        const user = await userModel.findById(id);
        const credit = user.balance + amount;
        user.balance = credit

        const desposite = await despositemodel.create({userId: id, amount});

        // desposite.userId = user._id
        await user.save()

        res.status(200).json({
            message:`${desposite.amount} has been added to you account successfully your balance is #${user.balance}`,
            data:user

        })


    }
    catch(error){
        res.status(500).json({
            error:`${error.message}`
        })
    }
}