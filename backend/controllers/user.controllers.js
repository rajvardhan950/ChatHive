import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
const getCurrentUser= async (req,res)=>{
    try{
        let userId=req.userId
        let user=await User.findById(userId).select('-password')
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)

    }catch(error){
        return res.status(500).json({message:`current user error ${error}`})

    }
    
}
export default getCurrentUser;

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      updateData.image = image;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      {
        returnDocument: "after", // new:true ki jagah
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `Profile Error: ${error.message}`,
    });
  }
};

export const getOtherUsers=async (req,res)=>{
    try{
        let users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({message:`get other users error ${error}`})
    }
}

export const search=async (req,res)=>{
    try{
         let {query}=req.query
         if(!query){
            return res.status(400).json({message:"query is required"})
         }
         let user = await User.find({
            _id: { $ne: req.userId },
            $or:[
                {name:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}},
            ]
         }).select("-password");
         return res.status(200).json(user)
    }catch(error){
         return res.status(500).json({message:`search users error ${error}`})
    }
} 