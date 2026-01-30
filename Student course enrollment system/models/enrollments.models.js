import mongoose from "mongoose";


const enrollSchema = mongoose.Schema({
    enrollmentId: {
        type: String,
        unique: true,
        required: true
    },
    studentEmail: String,
    courseId: String,
},
    {
        timestamps: true
    }
);

export default mongoose.model("enrolled", enrollSchema);
