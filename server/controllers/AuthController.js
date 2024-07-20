import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync,unlinkSync } from "fs"

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) => {
    return jwt.sign({email,userId}, process.env.JWT_KEY, {expiresIn:maxAge});
}

export const signup = async (req,res,next) => {
    try {
        const { email,password } = req.body;
        if(!email || !password) {
            return res.status(400).send("Email and Password are required!!!")
        }    
        const user = await User.create({email,password});
        res.cookie("jwt",createToken(user.email,user._id),{
            maxAge,
        });
        return res.status(201).json({
            user:{
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const login = async (req,res,next) => {
    try {
        const { email,password } = req.body;
        if(!email || !password) {
            return res.status(400).send("Email and Password are required!!!")
        }    
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send('User with the given email not found');
        }
        const auth = await compare(password, user.password);
        if(!auth) {
            return res.status(404).send('Password is incorrect');
        }
        res.cookie("jwt",createToken(user.email,user._id),{
            maxAge,
        });
        return res.status(200).json({
            user:{
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async (req,res,next) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(401).send("User with the given id not found!")
        }
        return res.status(200).json({
                id: userData._id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const updateProfile = async (req,res,next) => {
    try {
        const { userId } = req;
        const { firstName,lastName,color } = req.body;
        if (!firstName || !lastName || !color) {
            return res.status(400).send("All the fields are required!")
        }
        const userData = await User.findByIdAndUpdate(
            userId, 
            {
                firstName, lastName, color,profileSetup:true
            },
            { new:true, runValidators:true }
        )

        return res.status(200).json({
                id: userData._id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const addProfileImage = async (req,res,next) => {
    try {
        const { userId } = req;
        if (!req.file) {
            return res.status(400).send("File is required!")
        }
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                image: fileName
            },
            { new:true, runValidators:true }
        )
        return res.status(200).json({
                image: updatedUser.image,
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const removeProfileImage = async (req,res,next) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found!")    
        }
        if (user.image) {
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return res.status(200).send("Profile Image removed successfully!");        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const logout = async (req,res,next) => {
    try {
        res.cookie("jwt","",{ maxAge: 1})        
        return res.status(200).send("Logged out successfully")
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

