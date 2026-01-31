import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userid: {
            type: Number,
            required:true,
            unique: true
        },
        name:{
            type:String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true

    },

)

export default mongoose.model("User", userSchema);