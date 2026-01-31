import User from "../models/user.models.js"

export const Register = async (req, res) => { //default in js:async 

    let { name, email, password } = req.body //client req

    if (!name || !email || !password) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const uid = Math.floor(Math.random() * 10000) //generate random userid(not safe)

    try {
        const Userexist = await User.exists({ email })
        if (Userexist != null) {
            return res.status(409).json({
                status: false,
                message: "Email already registered"
            })
        }

        await User.create({  //adding new user to collection
            userid: uid,
            name: name,
            email: email,
            password: password
        })
        return res.status(201).json({
            status: true,
            message: "Registration Sucessfull"
        })
    }

    catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: "Registration failed"
        })
    }
}

export const Login = async (req, res) => { //login is for authentication and middleware is for authorization

    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    try {
        const userd = await User.findOne({ email: email, password: password })//check if user login exists in DB

        if (userd == null) {
            return res.status(404).json({ status: false, message: "User not found" })
        }

        if (userd.password != password) {
            return res.status(401).json({ status: false, message: "Wrong Credentials" })

        }

        return res.status(200).json({ status: true, message: "Login succesfull" })

    }

    catch (error) {
        return res.status(200).json({ status: true, message: "Login failed" })

    }

}


