const express=require("express")
const server=express()
server.use(express.json())

server.listen(6000,()=>{
    console.log("server is runnning")
})

const emp=[]

server.get("/login",(req,res)=>{
    return res.json({emp})
})

server.post("/register",(req,res)=>{
    let{fullname,id,password,role}=req.body

    if(!fullname || !id || !password || !role){
        return res.json({message:"Invalid Details"})
    }

    const empdet=emp.find((ele)=>emp.id==id)
        
    if(empdet==null){
        const newemp={
        fullname:fullname,
        id:id,
        password:password,
        role:role
    }
        emp.push(newemp)
        return res.json({message:"New user Created"})
}

return res.json({message:"emp already exists"})
    
})

server.post("/login",(req,res)=>{
    let{id,password}=req.body

    if(!id||!password){
        return res.json({message:"Login ID or password missing"})
    }

    const empdetails=emp.find((i)=>i.id==id)

    if(empdetails==null){
        return res.json({message:"Emp not found"})

    }
    return res.json({
        message:"Login Succesfull, Welcome "+ empdetails.role

    })
})

