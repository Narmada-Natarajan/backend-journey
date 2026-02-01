import express from "express";
import { connectDB } from "./config/db.config.js";
import { studentLogin, studentRegister} from "./controllers/student.controllers.js";
import { borrowBook, newBook, returnBook, transactionHistory } from "./controllers/book.controllers.js";
import { authmiddleware } from "./middlewares/auth.middlewares.js";

const server=express();

server.use(express.json());

server.listen(6000,()=>{
    console.log("server running");
    connectDB();
})

server.post("/register",studentRegister)

server.post("/login",studentLogin)

server.post("/add-book",authmiddleware,newBook)

server.post("/borrow-book",authmiddleware,borrowBook)

server.post("/return-book",authmiddleware,returnBook) 

server.get("/transaction",authmiddleware,transactionHistory ) 


