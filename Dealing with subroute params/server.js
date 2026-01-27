const express=require("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server activated")
})

server.get("/students/:school/:reg/:name",(req,res)=>{
    let{school,reg,name}=req.params;

    if(!school||!reg||!name){
        return res.json({message:"not found"})
    }
    return res.json({school:school,regno:reg,sname:name})
})

