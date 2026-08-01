import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import genToken from '../config/token.js'

export const signUp = async (req, res) => {
    try{
        const {userName,email, password} = req.body;
        const checkUserByUserName = await User.findOne({userName});
        if(checkUserByUserName){
            return res.status(400).json({message: "UserName already exists"});
        }
        const checkUserByUserEmail = await User.findOne({email});
        if(checkUserByUserEmail){
            return res.status(400).json({message: "Email already exists"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
    
    const hashedPassord = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName, email, password:hashedPassord
     });

     const token = await genToken(user._id);

     res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "Strict",
        secure: false, 
     })

     return res.status(201).json(user);
    }
        catch (error){
        return res.status(500).json({message: "signup error", error: error.message}); 
        }   

};
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Incorrect password"});
    }

     const token = await genToken(user._id);

     res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "Strict",
        secure: false, 
     })

     return res.status(200).json(user);
    }
        catch (error){
        return res.status(500).json({message: "login error", error: error.message}); 
        }   

};
export const logout = async (req, res) => {
    try {
      res.clearCookie("token")
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout error", error: error.message });
    }
  }
        