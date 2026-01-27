import express from "express";
const server=express()
server.use(express.json())

server.listen(5000,()=>{
    console.log("server active")
})

const user=[
    {id:1, name:"praveen",password:"123",role:'employee'},
    {id:2, name:"amit",password:"123",role:'hr'},
    {id:3, name:"rajesh",password:"123",role:'admin'},
    {id:4, name:"priya",password:"123",role:'employee'},
    {id:5, name:"vikram",password:"123",role:'hr'},
    {id:6, name:"ananya",password:"123",role:'admin'},
    {id:7, name:"sundar",password:"123",role:'employee'},
    {id:8, name:"neha",password:"123",role:'hr'},
    {id:9, name:"arjun",password:"123",role:'admin'},
    {id:10, name:"deepak",password:"123",role:'employee'},
    {id:11, name:"kavya",password:"123",role:'hr'},
    {id:12, name:"karan",password:"123",role:'admin'},
    {id:13, name:"sneha",password:"123",role:'employee'},
    {id:14, name:"rahul",password:"123",role:'hr'},
    {id:15, name:"divya",password:"123",role:'admin'},
    {id:16, name:"sanjay",password:"123",role:'employee'},
    {id:17, name:"pooja",password:"123",role:'hr'},
    {id:18, name:"varun",password:"123",role:'admin'},
    {id:19, name:"shreya",password:"123",role:'employee'},
    {id:20, name:"aditya",password:"123",role:'hr'}
]

 //Registration
server.post("/register",(req,res)=>{

    let{id,name,password,phonenumber,role}=req.body

    if(!id||!name||!password||!role){
        return res.json({response:"Invalid Request"})
    }

    const userdet=user.find((ele)=>ele.id==id)

    if(userdet==null){
        const newuser={
            id:id,
            name:name,
            password: password,
            phonenumber:phonenumber,
            role:role,
        }
        user.push(newuser)
        return res.json({response:"new user added"})
    }
    return res.json({response:"user already exists"})
})

//Login
server.post("/login",(req,res)=>{

    let{id,password}=req.body

    if(!id||!password){
        return res.json({response:"Invalid Request"})
    }

    const userd=user.find((ele)=>ele.id==id)

    if(userd==null){
        return res.json({response:"No user found"})
    }
    if(userd.password==password){
        return res.json({response:"Login successfull"})
    }
    return res.json({response:"Invalid Credentials"})
})

//Forgot Password

server.patch("/pass-change",(req,res)=>{
    let{id,password}=req.body

    const userdets=user.find((ele)=>ele.id==id)

    const newuserdets={

        ...userdets,
        password:password

    }
    const index=user.findIndex((ele)=>ele.id==id)

    if(index==-1){
        return res.json({response:"user does not exist"})
    }

    user.splice(index,1)
    user.push(newuserdets)
    return res.json({response:"user password updated"})

})

//Delete
server.delete("/delete",(req,res)=>{
    
    let {hid, uid} = req.body;

    if(!hid || !uid) return res.json({message:'Invalid Requuest'})

    const userdetails = user.find((ele)=>ele.id==hid);

    if(userdetails == null) return res.json({message:'Hr not found'})

    if(userdetails.role == "hr"){
        // Delete UID from DB
        const index = user.findIndex((ele)=>ele.id == uid)
        if(index == -1) return res.json({message:"user not found"})
        
        // Delete The user 

        user.splice(index,1)

        return res.json({message:"User deleted sccessfulkuu"})

    }

    return res.json({message:'Youur are not athorised to delete'})





})




