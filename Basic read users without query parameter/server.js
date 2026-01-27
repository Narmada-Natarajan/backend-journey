
const express=require ("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server running")
})

const users=[
    {id:"1",name:"Alice"},
    {id:"2",name:"Bob"},
    {id:"3",name:"Charlie"},
]

server.get("/users",(req,res)=>{
    return res.json({users})
 
})
