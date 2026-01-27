const express = require("express")
const server = express()
server.use(express.json())
server.listen(3000, () => {
    console.log("server runs")
})

const user = [
    {reg: "23bai10410", password: "djjksa"},
    {reg: "23bai10411", password: "djjkss"},
    {reg: "23bai10412", password: "djjisa"},
    {reg: "23bai10413", password: "djaksa"},
    {reg: "23bai10414", password: "djdksa"},
    {reg: "23bai10415", password: "djgksa"},
    {reg: "23bai10416", password: "djfksa"},
    {reg: "23bai10417", password: "dojksa"},
    {reg: "23bai10418", password: "hjjksa"},
    {reg: "23bai10419", password: "kjjksa"},
]

server.get("/login", (req, res) => {
    let { reg, password } = req.query


    if (reg && password) {
        res.json({ status: "True", message: "Login Successful" })

    }
    else if ((!reg && password)||(reg && !password)) {
        res.json({ status: "False", message: "Invalid Login Credentials" })
    }
    else {
        res.json({ status: "False", message: "Invalid Request" })

    }

    const result=user.find((ele)=> ele.reg==reg)
    


})