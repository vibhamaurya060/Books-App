import { config } from "dotenv";
config();

import jwt from 'jsonwebtoken';

const auth=(req, res, next)=>{
    const token=req.headers['authorization']?.split(" ")[1];
    console.log(req.headers);

    if(!token){
        res.status(400).json({message: "token is not provided"})
    }

    jwt.verify(token, process.env.JET_SECRET, (err, result)=>{
        if(err) console.log(err);
        else{
            req.result=result;
            next();
        }
    })
}

export default auth;