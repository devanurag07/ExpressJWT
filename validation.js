const Joi=require("@hapi/joi");


const registerValidation=(reqBody)=>{
    
    //Validation
    const schema=Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().email().min(6).required(),
        password:Joi.string().min(6).required(),
    })

    const {error}=schema.validate(reqBody);

    if (error){
        
        return {error:true,message:error.details[0].message}

    }else{
        return {error:false}
    }

}



const loginValidation=(reqBody)=>{

    //Validation
    const schema=Joi.object({
        email:Joi.string().email().min(6).required(),
        password:Joi.string().min(6).required(),
    })

    const {error}=schema.validate(reqBody);

    if (error){
        
        return {error:true,message:error.details[0].message}

    }else{
        return {error:false}
    }

}

module.exports={regValidation:registerValidation,loginValidation};