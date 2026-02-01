import Students from "../models/students.models.js"

//student registration

export const studentRegister = async (req, res) => {

    let { reg, pass, name, age } = req.body

    if (!reg || !pass || !name || !age) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })
    }

    const existing = await Students.exists({ regno: reg })

    //regno is Primary Key so we have to check if its already registered

    if (existing != null) {
        return res.status(409).json({
            status: false,
            message: "Registration number already exists"
        })
    }

    //else

    try {
        await Students.create({
            regno: reg,
            password: pass,
            fullname: name,
            age: age,
        })
        return res.status(200).json({
            status: true,
            message: "Registration Successfull"
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

//student login

export const studentLogin = async (req, res) => {

    let { reg, pass } = req.body

    if (!reg || !pass) {
        return res.status(400).json({
            status: false,
            message: "Invalid Request"
        })

    }

    //else

    try {

        const checkexist = await Students.exists({ regno: reg, password: pass })


        if (checkexist == null) {
            return res.status(200).json({
                status: true,
                message: "Student not found or Invalid Credentials "
            })

        }
        return res.status(200).json({
            status: true,
            message: "Login Successfull"
        })
    }

    catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: "Login failed"
        })

    }


}


