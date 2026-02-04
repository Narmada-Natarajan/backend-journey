import express from "express"
import { Register } from "./controllers/user.controller.js"
import { ConnectDB } from "./config/db.config.js"

const server = express()

server.use(express.json())

server.listen(5000,()=>{
    console.log('Server is running in 5000 Port')
    ConnectDB()
})



server.post("/register",Register)