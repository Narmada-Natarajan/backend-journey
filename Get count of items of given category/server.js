const express=require("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server active")
})

const items=[
    {id:1,name:"Item1",category:"electronics"},
    {id:2,name:"Item2",category:"electronics"},
    {id:3,name:"Item3",category:"books"},
    {id:4,name:"Item4",category:"electronics"}
]

server.get("/count",(req,res)=>{
    let{category}=req.query

    
const prodet=items.filter((ele)=>ele.category==category)

if(prodet==null){
    return res.json({status:false,message:"items not found"})
}
return res.json({category:category,count:prodet.length})
})