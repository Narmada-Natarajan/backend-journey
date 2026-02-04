import { Emailchecker } from "../utils/emailchecker.js";
import { CheckPassword } from "../utils/passchecker.js";
import User from "../models/user.model.js"

import bcrypt from "bcrypt"


export const Register = async (res, req) => {
    let { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) return res.json({ status: false, message: "Invalid Request" })
    if (firstname.trim() === "" || lastname.trim() === "") return res.json({ status: false, message: "First and Last Name Cannot be empty" })
    const iscrt = Emailchecker(email.toLowerCase())
    if (iscrt == false) return res.json({ status: false, message: "Invalid Email Address" })
    const iscrtpass = CheckPassword(password);
    if (iscrtpass == false) return res.json({ status: false, message: "Password Should follow Password rules" })

    // Code here

    const hashpass = await bcrypt.hash(password, 10);

    const emailuser = User.exists({ email: email })

    if (emailuser !== null) return res.json({ status: false, message: "Email Aldready Exist" })

    try {
        await User.create({
            name: firstname + lastname,
            email: email,
            password: hashpass
        })

        return res.json({ status: true, message: "Created Successfully" })

    }
    catch (e) {
        console.error(e)
        res.json({ status: false, message: "Something went wrong", error: e })
    }





}