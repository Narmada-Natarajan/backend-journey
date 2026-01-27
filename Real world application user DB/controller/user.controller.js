import express from "express";

const user = [
    { id: 1, name: "praveen", password: "123", role: 'employee' },
    { id: 2, name: "amit", password: "123", role: 'hr' },
    { id: 3, name: "rajesh", password: "123", role: 'admin' },
    { id: 4, name: "priya", password: "123", role: 'employee' },
    { id: 5, name: "vikram", password: "123", role: 'hr' },
    { id: 6, name: "ananya", password: "123", role: 'admin' },
    { id: 7, name: "sundar", password: "123", role: 'employee' },
    { id: 8, name: "neha", password: "123", role: 'hr' },
    { id: 9, name: "arjun", password: "123", role: 'admin' },
    { id: 10, name: "deepak", password: "123", role: 'employee' },
    { id: 11, name: "kavya", password: "123", role: 'hr' },
    { id: 12, name: "karan", password: "123", role: 'admin' },
    { id: 13, name: "sneha", password: "123", role: 'employee' },
    { id: 14, name: "rahul", password: "123", role: 'hr' },
    { id: 15, name: "divya", password: "123", role: 'admin' },
    { id: 16, name: "sanjay", password: "123", role: 'employee' },
    { id: 17, name: "pooja", password: "123", role: 'hr' },
    { id: 18, name: "varun", password: "123", role: 'admin' },
    { id: 19, name: "shreya", password: "123", role: 'employee' },
    { id: 20, name: "aditya", password: "123", role: 'hr' }
]

export const AddUser=(req, res) => {

    let { id, name, password, phonenumber, role } = req.body

    if (!id || !name || !password || !role) {
        return res.json({ response: "Invalid Request" })
    }

    const userdet = user.find((ele) => ele.id == id)

    if (userdet == null) {
        const newuser = {
            id: id,
            name: name,
            password: password,
            phonenumber: phonenumber,
            role: role,
        }
        user.push(newuser)
        return res.json({ response: "new user added" })
    }
    return res.json({ response: "user already exists" })
}



