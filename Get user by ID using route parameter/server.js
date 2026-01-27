//Problem 1: Get User by ID

const express=require("express")
const server=express()
server.use(express.json())

server.listen(4000,()=>{
    console.log("server active")
})

const users=[
  {
    id:1,
    name:"Aarav Sharma",
    email:"aarav.sharma@example.com",
    age:20
  },
  {
    id:2,
    name:"Priya Verma",
    email:"priya.verma@example.com",
    age:21
  },
  {
    id:3,
    name:"Rohan Mehta",
    email:"rohan.mehta@example.com",
    age:25
  }
]

server.get("/users/:id",(req,res)=>{
    let{id}=req.params;


    if(!id){
        return res.status(404).json({
            status:false,
            error:"userid missing"})

    }

const det=users.find((ele)=>ele.id==id)

if(det==null){
    return res.status(404).json({
            status:false,
            error:"user not found"})

}
return res.status(200).json({Response:det})
})
