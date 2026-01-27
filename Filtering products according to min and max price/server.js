const express=require("express")
const server=express()
server.use(express.json())
server.listen(1000,()=>{
    console.log("server is active")
})

const products=[
    {id:1,name:"Item A",price:50},
    {id:2,name:"Item B",price:100},
    {id:3,name:"Item C",price:200},
    {id:4,name:"Item D",price:300}
]

server.get("/products",(req,res)=>{

    let{minPrice,maxPrice}=req.query

    if(!minPrice ||!maxPrice){
        return res.json({status:false,message:"price is missing"})
    }

const details=products.filter((ele)=>(ele.price>minPrice && ele.price<maxPrice))

if(details==null){
    return res.json({status:false,message:"product not found"})
}
return res.json({details})

})