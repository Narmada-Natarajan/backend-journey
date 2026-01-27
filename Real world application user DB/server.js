import express from "express";
const server=express()
server.use(express.json())

server.listen(5000,()=>{
    console.log("server active")
})

const user=[
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

//




