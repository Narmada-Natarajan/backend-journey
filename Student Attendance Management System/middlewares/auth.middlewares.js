import users from "../models/user.models.js"

export const authmiddleware = async (req, res, next) => {

    let { email, password } = req.body

    if (!email || !password) {

        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })

    }

    try {

        const authuser = await users.findOne({ email: email, password: password })

        if (authuser != null) {
            return next()

        }
        return res.status(401).son({ status: false, message: "User not found or wrong credentials" })
    }

    catch (error) {
        return resstatus(500).json({ status: false, message: "Something went wrong" })
    }
}

