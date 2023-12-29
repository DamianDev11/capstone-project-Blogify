import express from "express"
import IAMUser from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signUpUser = async (req,res)=>{
    try {
        const existUser = await IAMUser.findOne({email:req.body.email})
        if(existUser){
            throw new Error("User already exists!")
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUser = await IAMUser.create({...req.body,password:hashedPassword})

        const {password,...others} = newUser._doc
        const token = jwt.sign({id:newUser._id,},process.env.jwtPrivateKey,{expiresIn:"4h"})

        return res.status(201).json({user:others,token})
    }catch(error){
        return res.status(500).json({error:error.message})  
    }
}


export const loginUser = async(req,res)=>{
    try {
        const user = await IAMUser.findOne({email:req.body.email})
        if(!user){
            throw new Error("Invalid credentials")
        }

        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            throw new Error("Invalid credentials")
        }

        const {password,...others} = user._doc
        const token = jwt.sign({id:user._id,},process.env.jwtPrivateKey,{expiresIn:"4h"})

        return res.status(200).json({user:others,token})

    }catch(error){
        return res.status(500).json({error:"Invalid credentials"})
    }
}

