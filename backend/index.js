require("dotenv").config();


const config=require("./config.json");
const mongoose=require("mongoose"); 

mongoose.connect(config.connectionString);

const User=require("./models/user.model")


const express=require("express");
const cors=require("cors");
const app=express();


const jwt=require("jsonwebtoken");
const {authenticationToken}=require("./Utilities");
const e = require("express");

app.use(express.json());

app.use(
    cors({
        origin:"*",

    })
);



//create account
app.post("/create-account",async (req,res)=>{
    const {fullName,email,password}=req.body;

    if(!fullName){
        return res.status(400).json({error:true,message:"full name is requried"});
    }

    if(!email){
        return res.status(400).jason({error:true,message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"password is required"});
    }

    const isUser=await User.findOne({email:email});

    if(isUser){
        return res.json({
            error:true,
            message:"User already exist",
        });
    }

    const user=new User({
        fullName,email,password
    });

    await user.save();

    const accessToken=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30000M"});

    return res.json({error:false,user,accessToken,message:"Registeration Successful"});


});


app.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    if(!email){return res.status(400).json({message:"Email is requried"});}
    if(!password){return res.status(400).json({message:"Password is required"});}

    const userInfo=await User.findOne({email:email});

    if(!userInfo){return res.status(400).json({message:"User not found"});}

    if(userInfo.email==email&& userInfo.password==password){
        const user={user:userInfo};
        const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30000m"});

        return res.json({
            error:false,
            message:"Login Successful",
            email,
            accessToken,
        });
    }else{
        return res.status(400).json({error:true,message:"Invalid Credentials",})
    }

    

});

app.listen(9000);
module.exports=app;