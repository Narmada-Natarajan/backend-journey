const express=require("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server is running")
})
server.get("/multiply",(req,res)=>{
    let{a,b}=req.query
    
    if(!a||!b){

        return res.json({response:"numbers missing"})
    }
    res.json({
        product:a*b})
})