const express=require("express")
const server=express()
server.use(express.json())
server.listen(1000,()=>{
    console.log("Server Running")
})
server.get("/contact",(req,res)=>{
    let{phonenumber}=req.query
    
    
    console.log("someone in contact page")

    if(phonenumber=="9025981357"){
        res.json({username:"Praveen KR" , age:"19",dob:"14-03-2006"})
    }
    else if(phonenumber=="9393580398"){
        res.json({username:"Pravii" , age:"20",dob:"14-03-2005"})
    }
    else if(phonenumber=="9025988357"){
        res.json({username:"Narmada" , age:"18",dob:"14-03-2004"})
    }
    else if(phonenumber=="9125981357"){
        res.json({username:"Praveen" , age:"17",dob:"14-03-2007"})
    }
    else if(phonenumber=="9725981357"){
        res.json({username:"Naams" , age:"19",dob:"11-03-2006"})
    }

    else{
        res.json({message:"Invalid Phone Number"})
    }


    
})

