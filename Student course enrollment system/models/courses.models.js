import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        courseId: {
            type: String,
            unique: true,
            required: true
        },
        courseName: String,
        description: String,
        duration: String,
    },
    {
        timestamps: true
    }

);

export default mongoose.model("course", courseSchema);