const express=require("express")
const server=express()
server.use(express.json())

server.listen(3000,()=>{
    console.log("Server is Running")
})

server.get("/login",(req,res)=>{
    let{username,password}=req.query
    console.log(username,password)
    console.log("someone in login page")


    if(!username || !password){
        res.json({message:"Invalid Response"})
    }
    else if(username=="naams" && password=="praveen" ){
        res.json({message:"Login Successfull"})
    }
    else {
        res.json({message:"Invalid Username or Password"})
    }
   

})
