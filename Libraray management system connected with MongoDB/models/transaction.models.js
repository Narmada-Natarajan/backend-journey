import mongoose from "mongoose";

const tranSchema = mongoose.Schema({
    
    bookid: {
        type: String,
        required: true,
    },
    lendedto: {
        type: String,
        required: true
    }
},

    {
        timestamps: true
    }

)

export default mongoose.model("transactions", tranSchema)
