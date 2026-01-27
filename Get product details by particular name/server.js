const express=require("express")
const server=express()
server.use(express.json())
server.listen(5000,()=>{
    console.log("server active")
})

const products=[
    {id:1,name:"Laptop Pro",price:1000},
    {id:2,name:"Gaming Laptop",price:2000},
    {id:3,name:"Phone",price:500},
]

server.get("/search",(req,res)=>{
    let {name}=req.query

    if(!name){
        return res.json({status:false,alert:"name is missing"})
    }

const detail=products.filter((ele)=>ele.name.includes(name))

if(detail==null){
    return res.json({status:false,alert:"product not found"})
}
return res.json({detail})
})