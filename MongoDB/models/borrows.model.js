import mongoose from "mongoose";

const borrowRecords=mongoose.Schema({
    email:String,
    id:{
        type:Number,
        unique:true
    },
    borrowDate:Date
})

export default mongoose.model("borrow",borrowRecords)
