const express=require("express")
const server=express()
server.use(express.json())
server.listen(1000,()=>{
    console.log("server active")
})

const books=[
    {id:1,title:"js Basics",author:"John"},
    {id:2,title:"Web Development",author:"Sarah"}
]

server.get("/books",(req,res)=>{
    return res.json({books})
})