import express from "express"; 
import { connectDB } from "./config/db.config.js";
import { userLogin, userRegister } from "./controllers/user.controllers.js";
import { authTeacher } from "./middlewares/role.middlewares.js";
import { markAttendance } from "./controllers/attendance.contollers.js";
import { authmiddleware } from "./middlewares/auth.middlewares.js";

const server=express()

server.use(express.json())

server.listen(8000,()=>{
    console.log("Server active");
    connectDB();
})

server.post("/register",userRegister)

server.post("/login",userLogin)

server.post("/mark-attendance",authmiddleware,authTeacher,markAttendance)







