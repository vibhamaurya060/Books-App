import { Schema, model } from "mongoose";

const userSchema=new Schema({
    role: {type: String, enum: ["admin", "user"], default: "user"},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const userModel=model("users",userSchema);

export default userModel;