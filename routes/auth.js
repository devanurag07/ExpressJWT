const router=require("express").Router();
const User=require("../model/user");
const {regValidation,loginValidation}=require("../validation");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authMiddleware} = require("../routes/jwtvalidation");

router.post('/register',async (req,res)=>{

    //vALIDATE THE DATA
    
    const errorObj=regValidation(req.body);
    
    if (errorObj.error){
        console.log(errorObj);

        return res.status(400).send(errorObj.message);        
    }


    const emailExist=await User.findOne({email:req.body.email});

    if (emailExist){
        return res.status(400).send("Email already exists");
    }

    const hashedPassword=await bcrypt.hash(req.body.password,10);

    
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword})


    try{

        const savedUser=await user.save();
        res.send(savedUser);

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})


router.post("/login",async (req,res)=>{

    const errorObj=loginValidation(req.body);

    if (errorObj.error){
        return res.status(400).send(errorObj.message);
    }
    const email=req.body.email;
    
    const user=await User.findOne({email:req.body.email})

    if(!user){
        return res.status(400).send("Email or password incorrect")
    }

    //Checking password
    const isCorrect=await bcrypt.compare(req.body.password,user.password);
    
    if(!isCorrect){
        // res.send("The password got matched");
        return res.send("The password is incorrect");
    }



    const jwtToken=jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    
    res.header("auth_token",jwtToken).send(jwtToken);

})


router.get("/profile",authMiddleware,(req,res)=>{

    res.send(`Hello ${req.user.name}`);
})


module.exports=router;
