import express from "express"; //import module in node js:express to create server efficiently
 
import { connectDB } from "./config/db.config.js";
import { Login, Register } from "./contollers/auth.contollers.js";
import { deleteTask, newTask, readTask, updateTask} from "./contollers/task.controllers.js";
import { authmiddleware } from "./middlewares/auth.middleware.js";

const server = express(); //create server

server.use(express.json()); //binary to json

server.listen(5000, () => { //port to run server 
    console.log("server active"); 
    connectDB();
})

server.post("/register", Register) //Routes

server.post("/login",Login)

server.post("/new-task",authmiddleware,newTask)

server.get("/view-task",authmiddleware,readTask)  

server.put("/edit-task",authmiddleware,updateTask) 

server.delete("/delete-task",authmiddleware,deleteTask)







