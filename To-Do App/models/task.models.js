import mongoose from "mongoose";

const tasksSchema=mongoose.Schema({


    taskid:{
        type:String,
        required:true,
        unique:true
    },
    taskname:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        required:true,
        default:"pending"
    },

    createdby:{
        type:String,
        required:true,
    }
},
    {
        timestamps:true
    }
    

)

export default mongoose.model("Tasks",tasksSchema)