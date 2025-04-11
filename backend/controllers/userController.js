import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';  

export const getUserData = async (req, res) =>{
  try{
    const{userId} = req.body
    
    const user = await userModel.findById(userId);

    if(!user){
       return res.json({success: false, message:'User not found'}) 
    }

    res.json({
        success: true,
        userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }
    });

  }catch(error){
    res.json({success: false, message: error.message});
  }
}

// Route for admin login
export const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
