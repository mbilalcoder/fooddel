import userModel from "../module/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"


const createToken =(id)=>{
   return jwt.sign({id}, process.env.JWT_SECRET_KEY,)
}

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success: false, message:"User dose not exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success: false, message:"Password dose not match"})            
        }
        const token = createToken(user._id)
        return res.json({success: true, token})            
    } catch (error) {
        console.log(error)
        return res.json({success: false, message:"Error"})   
    }
    
}


const registerUser = async (req, res)=>{

    const {name, password, email} = req.body
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"user is not available"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"email is not valid"})
        }
        
        if(password.length < 8){
            return res.json({success:false, message:"strong password is required"})
        }

        const salt = await bcrypt.genSalt(10,)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
    
}

export {loginUser, registerUser}