import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    bookname:String,
    title:String,
    author:String
})

export default mongoose.model("book",bookSchema)

