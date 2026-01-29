//Defining Database Schema

import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:String
})

export default mongoose.model("user",userSchema)
