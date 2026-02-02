import mongoose from "mongoose";    

const userSchema=mongoose.Schema({

    name:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        reqired:true,
        unique:true
    },
    password:{
        type:String,
        reqired:true
    },
    role:{
        type:String,
        reqired:true,
        enum:["teacher","student"]
    }
},

{
    timestamps:true
}
)

export default mongoose.model("users",userSchema)