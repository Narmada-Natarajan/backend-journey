const express=require("express")
const server=express()
server.use(express.json())
server.listen(6000,()=>{
    console.log("server active")
})

const users=[
    {id:1,name:"Alice", age:25},
    {id:2,name:"Bob", age:35},
    {id:3,name:"Charlie", age:20}
]

server.get("/users/filter",(req,res)=>{
    let{minAge}=req.query

    if(!minAge){
        return res.json({status:false,alert:"minAge id missing in request"})
    }

const userdet=users.filter((ele)=> ele.age>=minAge)

if(userdet==null){
    return res.json({status:false,alert:"minAge not present"})
}
return res.json({userdet})

})





