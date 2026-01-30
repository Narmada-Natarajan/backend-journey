import User from "../models/users.models.js";

export const userLogin=(req, res) => {

    let { email, password } = req.body

    if (!email || !password) {
        return res.json({ message: "Invalid Request" })
    }

    const userd = users.find((i) => i.email == email)

    if (userd == null) {
        return res.json({ message: "User not found" })

    }
    if (userd.password != password) {
        return res.json({ message: "Invalid Password" })
    }
    return res.json({ message: "Login successfull" })
}




