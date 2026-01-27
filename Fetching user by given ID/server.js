const express=require ("express")
const server=express()
server.use(express.json())
server.listen(4000,()=>{
    console.log("server running")
})

const users=[
    {id:"1",name:"Alice",age:25},
    {id:"2",name:"Bob",age:30},
    
]

server.get("/users",(req,res)=>{
    let{id}=req.query

    if(!id){
       return res.json({status:false,alert:"id missing"})
    }

const user=users.find((ele)=>ele.id==id)

if(user==null){
    return res.json({status:false,alert:"id not found"})
}
return res.json({user})

})
