import mongoose from "mongoose";

const studentSchema = mongoose.Schema({

    regno: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
},

    {
        timestamps: true
    }

)

export default mongoose.model("Students", studentSchema)
