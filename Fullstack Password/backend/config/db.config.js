import mongoose from "mongoose";

export async function ConnectDB() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fullstack");
    console.log("Db is connected")
}