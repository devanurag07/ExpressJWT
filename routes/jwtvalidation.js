const jwt=require("jsonwebtoken");
require("dotenv/config");
const User=require("../model/user");


const authMiddleware = async (req,res,next)=>{


    const token = req.headers.auth_token;

    if(!token){
        return res.status(401).send("Login required");
    }

    try{
        const userDetails=jwt.verify(token,process.env.TOKEN_SECRET);

        const user=await User.findOne({_id:userDetails._id});

        req.user=user;
        
        next()
        
    }
    catch (e) { 

        if (e instanceof jwt.JsonWebTokenError){
            res.status(400).send("invalid token");
        }else{
            throw e;
        }
    } 

    // res.send("Hello")
    // next()

}


module.exports.authMiddleware=authMiddleware;