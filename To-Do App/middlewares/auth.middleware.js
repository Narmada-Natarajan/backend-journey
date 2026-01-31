import User from "../models/user.models.js"

export const authmiddleware= async (req, res,next) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "Invalid Request" })
    }

    const userd= await User.exists({email:email,password:password})

    if(userd!=null){
        return next()
    }
    return res.status(401).json({status:false,message:"Wrong Credentials"})

}



