import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
    },
    name: String,
    role: String,

    },
    
    {
        timestamps: true
    }

);

export default mongoose.model("user", userSchema);