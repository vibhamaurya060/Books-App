import {Router} from 'express'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken';

const userRouter=Router();

userRouter.post('/register', async(req, res)=>{
    const {username, email, password, role}= req.body;
  try{
    if(!username || !email || !password || !role){
        res.status(400).json({message: "This is not a valid body"})
    }

    const existUser=await userModel.findOne({email: email})

    if(existUser){
        res.status(400).json({message: "This email is already registered try to login."})
    }

    const hashPassword=bcrypt.hashSync(password, 12);

    const user=new userModel({email, password:hashPassword, username, role});
    await user.save();
    res.status(201).json({message: "user is registered successfully."});
      
  }
  catch(err){
    res.status(500).send(err);
  }
});


// login

userRouter.post('/login', async(req, res)=>{
    const {email, password}= req.body;
    try{
        if(!email || !password){
            res.status(400).json({message: "This is not a valid body"});
        }

        const existUser=await userModel.findOne({email: email});
        if(!existUser){
            res.status(400).json({message:"this email is not registered try to register."})
        }

        bcrypt.compare(password,existUser.password, (err, result)=>{
            if(err) console.log(err)
            if(result){
                const payload= {email:existUser.email, id: existUser._id};
                jwt.sign(payload,process.env.JET_SECRET, (err, token)=>{
                    if(err) console.log(err);
                    return res.status(200).json({accessToken: token})
                })
            }
            else{
                res.status(400).json({message:"user information is not correct try to check your details"})
            }
        })
  
    }
    catch(err){
      res.status(500).send(err);
    }
  });


// logout

userRouter.post('/logout', async(req, res)=>{
    try{
  
    }
    catch(err){
      res.status(500).send(err);
    }
  });


  export default userRouter;