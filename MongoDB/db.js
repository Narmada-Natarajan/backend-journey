import mongoose from "mongoose"

const mongodbconnect = async ()=> {

    await mongoose.connect("mongodb://127.0.0.1:27017");
    console.log("Mongodb Connected")

}

mongodbconnect()