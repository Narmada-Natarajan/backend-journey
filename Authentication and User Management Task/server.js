const express = require("express")
const server = express()
server.use(express.json())
server.listen(5000, () => {
    console.log("server alive")
})

const users = [
    {
        email: "admin@admin.com",
        password: "admin123",
        name: "admin",
        role: "admin"
    },
    {
        email: "hr@company.com",
        password: "hr123",
        name: "HR Manager",
        role: "hr"
    },
    {
        email: "user@company.com",
        password: "user123",
        name: "John Doe",
        role: "user"
    }
]

//1.Register Route

server.post("/login", (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Invalid Request" })
    }

    //check from DB

    const userdetails = users.find((i) => i.email == email)

    if (userdetails == null) {
        return res.json({ success: false, message: "No such user found" })
    }

    if (userdetails.password != password) {
        return res.status(401).json({ success: false, message: "Invalid password" })
    }
    return res.status(200).json({ success: true, message: "Login successfull", userdetails })

})

//2. Login Route

server.post("/add-user", (req, res) => {

    let { email, password, useremail, userpass, username, userrole } = req.body

    if (!email || !password || !useremail || !userpass || !username || !userrole) {
        return res.status(400).json({ success: false, message: "Invalid Request" })
    }

    const userd = users.find((i) => i.email == email)

    if (userd == null) {
        return res.json({ success: false, message: "User not found" })
    }

    if (userd.password != password) {
        return res.json({ success: false, message: "Invalid Password" })
    }

    if(userd.email==useremail){
        return res.json({message:"User Already exists"})
    }

    if (userd.role != "hr" && userd.role != "admin") {
        return res.json({ success: false, message: "Only hr or admin can add new users" })

    }

    const newuser = {
        email: useremail,
        password: userpass,
        username: username,
        role: userrole
    }

    users.push(newuser)
    return res.status(200).json({ success: true, message: "new user added", newuser })

})

    
//3.Forgot Password Route

server.patch("/forgot-password",(req,res)=>{
    let{email,newpassword}=req.body

    if(!email||!newpassword){
        return res.json({message:"Invalid Request"})
    }

    const userdet=users.find((i)=>i.email==email)

    if(userdet==null){
        return res.json({message:"user not found"})
    }

    if(userdet.password==newpassword){
         return res.json({message:"password already exists"})
    }


    //change password 

    const index=users.findIndex((i)=>i.email==email)

    const newuserdata={
        ...userdet,
        newpassword:newpassword
    }

    if(index==-1){
        return res.json({message:"user does not exist"})
    }

    users.splice(index,1) //deleting old password
    users.push(newuserdata)
    return res.json({message:"password updated successfully",user:{
        email:email,
        newpassword:newpassword
    }})
})


