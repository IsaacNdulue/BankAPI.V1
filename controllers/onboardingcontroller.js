const userModel = require("../models/onboardingmodel")
const bcrypt = require("bcrypt")
// const cloudinary = require("../multers/cloudinary")
// import {v2 as cloudinary} from 'cloudinary';
// const cloudinary = require('cloudinary').v2
require("dotenv").config()



const jwt = require("jsonwebtoken")

// signUp function
exports.signUp = async(req,res)=>{
    try {
        
        //fetch the users details
        const {firstName,lastName,phoneNumber,email,password,confirmPassword,sex,pin} = req.body;
        console.log(req.body)
    

        // check if the email exists
        const userExist = await userModel.findOne({email})

        // return a response
        if(userExist){
            return res.status(400).json({
                error: "user with email already exist"
            })
        }
        if(password !== confirmPassword){
           return res.status(400).json({
            error:"Confirm Password not correct"
           })
        }

        //salt & hash your password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        //create the user
        const user = await userModel.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            accountNumber:phoneNumber.slice(1),
            password:hash,
            sex,
            pin
        })

        //throw a response
        res.status(201).json({
            message: "user created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

//login function
exports.login = async(req,res)=>{
    try {
        
        //get the users details
        const {email, password} = req.body

        //check if the email exist
        const userExist = await userModel.findOne({email})

        //throw response
        if (!userExist) {
            return res.status(404).json({
                error: "user not found"
            })
        }

        //check the password
        const checkPassword = bcrypt.compareSync(password, userExist.password)

        //throw response
        if(!checkPassword){
            return res.status(400).json({
                error: "WRONG PASSWORD"
            })
        }

        //generate a token for the user
        const token = jwt.sign({
            userId: userExist._id,
            email: userExist.email
        }, process.env.jwtKey, {expiresIn: "1d"})

        //throw a response
        res.status(200).json({
            message: "successfully logged in",
            data:userExist,
            token
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

//update a user function
exports.updateUser = async (req,res)=>{
try{

    //get the user id
    const id = req.user.userId

    //instance of what the user can update
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        balance: req.body.balance
    }

    //update the user
    const update = await userModel.findByIdAndUpdate(id,data,{new:true})

    //throw a response
    res.status(200).json({
        message: "user updated successfully",
        update
    })

}catch(error){
    res.status(500).json({
        error: error.message
    })
}
}

//logout function
exports.logout = async(req,res)=>{
    try {
        // get the token 
        const hasAuthor = req.headers.authorization

        // extract the token
        const token = hasAuthor.split(" ")[1]
        
        //get the users id
        const id = req.user.userId

        // find the user 
        const user = await userModel.findById(id) 

        //check if the user exist
        if (!user) {
            return res.status(404).json({
                error: "user not found"
            })
        }

        // log the user out by pushing the token to blackList
        user.blackList.push(token)
        await user.save()

        // thow a response
        res.status(200).json({
            message:"successfully logedOut"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

//get all users
exports.getAll = async(req,res)=>{
    try{

        //fetch user in the database
        const users = await userModel.find()

        //check if they is user
        if(!users){
            return res.status(404).json({
                error: "no user found"
            })
        }

        //show the users active
        res.status(200).json({
            messsage: "here are all the users saved",
            data:users
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}