const express=require("express");
const authRoute=require("./routes/auth.js");
const mongoose=require('mongoose');
require("dotenv/config");

const app=express();

//Middleware
app.use(express.json());


//Routes
app.use("/api/user",authRoute);

//Connect TO DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser:true,useUnifiedTopology:true},(error)=>{

        if (error===null){
            console.log("Connected to Database");
        }else{
            console.log("Something went wrong "+error);
        }
    });




app.listen(3000,()=>{
    console.log("hello i am here");
})