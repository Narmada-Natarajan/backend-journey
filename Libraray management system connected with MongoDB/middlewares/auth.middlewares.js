import Students from "../models/students.models.js"


export const authmiddleware = async (req, res, next) => {

    let { reg, pass } = req.body

    if (!reg || !pass) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request middleware"
        })

    }

    try {
        const studentexist = await Students.exists({ regno: reg, password: pass })

        if (studentexist != null) {
            return next();

        }
        return res.json({status:false,message:"Student not found or Wrong Credentials"})
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: "Something went wrong"
        })
    }

}


