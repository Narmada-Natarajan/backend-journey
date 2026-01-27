const express=require("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server active")
})

const emp=[

]

server.get("/details",(req,res)=>{
    return res.json({emp})
})

server.post("/register",(req,res)=>{
    let{eid,ename,dob}=req.body

    if(!eid || !ename || !dob){
        return res.json({alert:"inavlid details"})
    }

    const newemp={
        id:eid,
        name:ename,
        birthday:dob
    }
    emp.push(newemp)
    return res.json({message:"new emp created"})
})