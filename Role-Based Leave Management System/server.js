const express = require("express")
const server = express()
server.use(express.json())
server.listen(5000, () => {
    console.log("server active")
})

const users = [

    { email: "admin@company.com", password: "admin123", name: "Aksa", role: "admin" },
    { email: "hr@company.com", password: "hr123", name: "Ruhi", role: "hr" },
    { email: "user@company.com", password: "user123", name: "John", role: "user" }
];

const leaves = [
  {
    id: 1,
    email: "user@company.com",
    reason: "Medical Leave",
    fromDate: "2026-02-01",
    toDate: "2026-02-03",
    status: "pending"
  },
  {
    id: 2,
    email: "admin@company.com",
    reason: "Sick Leave",
    fromDate: "2026-02-02",
    toDate: "2026-02-03",
    status: "pending"
  },
  {
    id: 3,
    email: "hr@company.com",
    reason: "Outing Leave",
    fromDate: "2026-02-01",
    toDate: "2026-02-02",
    status: "pending"
  }

];

//Authenticate user

server.post("/login", (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const userdetails = users.find((i) => i.email == email)

    if (userdetails == null) {
        return res.json({ status: false, message: "No user found" })
    }

    if (userdetails.password != password) {
        return res.status(401).json({ status: false, message: "Invalid password" })
    }
    return res.status(200).json({ status: true, message: "Login successfull", user: { email: userdetails.email, name: userdetails.name, role: userdetails.role } })

})

//Leave Applied by user

server.post("/apply-leave", (req, res) => {
    let { email, password,reason,fromDate,toDate } = req.body

    if (!email || !password ||!reason ||!fromDate||!toDate) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const userdet= users.find((i) => i.email == email)

    if (userdet== null) {
        return res.json({ status: false, message: "No user found" })
    }

    if (userdet.password != password) {
        return res.status(401).json({ status: false, message: "Invalid password" })
    }
    
    if(userdet.role=="user"){

        const newleave={
            id:Math.floor(Math.random()*10),
            email:email,
            reason:reason,
            fromDate:fromDate,
            toDate:toDate,

        }
        leaves.push(newleave)
        return res.status(200).json({ success:true, message: "Leave applied succesfully" ,email:userdet.email,newleave,status:"pending"})
    }
    return res.status(403).json({status:false,message:"Only Users can apply leave"})

})

//View Leaves - User leaves can only be viewed by user and Hr/admin leaves can view all leaves

server.get("/leaves",(req,res)=>{
    let{email,password}=req.body

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const userd = users.find((i) => i.email == email)

    if (userd== null) {
        return res.json({ status: false, message: "No user found" })
    }

    if (userd.password != password) {
        return res.status(401).json({ status: false, message: "Invalid password" })
    }

    
    if(userd.role=="user"){
        const userleave= leaves.filter((i) => i.email == email)

        if(userleave==null){
            return res.json({message:"user didn't apply for leave"})
        }
        return res.status(200).json({success: true, userleave})
    }

    if(userd.role=="hr" || userd.role=="admin"){
        return res.status(200).json({success: true, leaves })
    }








})
