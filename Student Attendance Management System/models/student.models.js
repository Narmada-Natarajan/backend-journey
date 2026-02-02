import mongoose from "mongoose";

const studentSchema=mongoose.Schema({

    regno:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    isActive:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)



export default mongoose.model("students",studentSchema)
