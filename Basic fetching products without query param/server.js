const express=require ("express")
const server=express()
server.use(express.json())
server.listen(3000,()=>{
    console.log("server running")
})

const products=[
    {id:1,name:"Laptop",price:1000},
    {id:2,name:"Phone",price:500},
    {id:3,name:"Tablet",price:300},
]

server.get("/products",(req,res)=>{
    return res.json({products})
 
})
