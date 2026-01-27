const express=require("express")
const server=express()
server.use(express.json())
server.listen(3000,()=>{
    console.log("server active")
})

const products=[
    {id:1,title:"JavaScript",author:"John Doe"},
    {id:2,title:"Python",author:"Jane Smith"},
    {id:3,title:"Web Dev",author:"John Doe"}
    
]

server.get("/books",(req,res)=>{
    let {author}=req.query

    if(!author){
        return res.json({status:false,alert:"author is missing"})
    }

const detail=products.filter((ele)=>ele.author==author)

if(detail==null){
    return res.json({status:false,alert:"book not found"})
}
return res.json({detail})
})