import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model("user",userschema)