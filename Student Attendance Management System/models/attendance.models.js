import mongoose from "mongoose"

const attendanceSchema =mongoose.Schema({

    
    studentId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"absent"
    },
    markedby:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
}

)


export default mongoose.model("attendance",attendanceSchema)

