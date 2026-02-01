import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    
    bookid: {
        type: String,
        unique: true,
        required: true,
    },
    bookname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default:"available"
    },
},

    {
        timestamps: true
    }

)

export default mongoose.model("Books", bookSchema)
