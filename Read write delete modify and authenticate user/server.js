const express = require("express")
const server = express()
server.use(express.json())
server.listen(5000, () => {
    console.log("server is active")
})

const users = [
    { id: "1", name: "Narmada", password: "2005", age: "20" },
    { id: "2", name: "Praveen", password: "2006", age: "30" },
    { id: "3", name: "Khushi", password: "2004", age: "40" },

]

//GET USER ID
server.get("/users/:id", (req, res) => {
    let { id } = req.params;

    if (!id) {
        return res.json({ message: "ID is missing" })
    }

    const userd = users.find((ele) => ele.id == id)

    if (userd == null) {
        return res.json({ message: "User not found" })

    }

    delete userd.password
    return res.json({userd })

})

//POST USERNAME,PASS,NAME,DOB

server.post("/register", (req, res) => {
    let { id, name, password, age } = req.body

    if (!id || !name || !password || !age) {
        return res.json({ message: "Invalid request" })
    }

    const userdet = users.find((ele) => ele.id == id)

    if (userdet == null) {
        const newuser = {
            id: username,
            password: password,
            name: name,
            age: age
        }
        users.push(newuser)
        return res.json({ message: "new user added" })

    }
    return res.json({ message: "User already exists" })

})

//LOGIN Authentication

server.post("/login", (req, res) => {
    let { id, password } = req.body

    if (!id || !password) {
        return res.json({ message: "Invalid request" })
    }
    const userdet = users.find((ele) => ele.id == id)

    if (userdet == null) {
        return res.json({ message: "User not found" })
    }
    if (userdet.password !== password) {
        return res.json({ message: "Invalid Password" })
    }
    return res.json({ message: "Login successfull" })

})

//DELETE GIVEN USER BY ID

server.delete("/user-delete/:id", (req, res) => {
    let { id } = req.body

    if (!id) {
        return res.json({ message: "Invalid request" })
    }

    const index = users.findIndex((ele) => ele.id == id)

    if (index == -1) {
        return res.json({ message: "User not found" })
    }

    users.splice(index, 1)
    return res.json({ message: "User Deleted" })

})

//MODIFY password ONLY

server.patch("/update", (req, res) => {
    let { password } = req.body

    if (!password) {
        return res.json({ message: "Invalid request" })
    }

    const change = users.find((ele) => ele.id == id)

    if (change == null) {
        return res.json({ message: "User not found" })
    }

    const updatedet = {
        ...change,
        password: password
    }
    if (index == -1) {
        return res.json({ message: "User not found" })
    }

    users.splice(index, 1)

    users.push(updatedet)
    return res.json({ message: "password updated" })


})
